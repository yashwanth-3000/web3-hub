from flask import Flask, request, jsonify
from flask_cors import CORS
from agents_workflow_ import agents_workflow
import logging
import traceback
from functools import wraps
import sys
from datetime import datetime

# Enhanced logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s - Line %(lineno)d in %(filename)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global variables
story_result = None
voiceover_result = None

class StoryGenerationError(Exception):
    """Custom exception for story generation errors"""
    def __init__(self, message, error_code, error_location):
        self.message = message
        self.error_code = error_code
        self.error_location = error_location
        self.timestamp = datetime.now().isoformat()
        super().__init__(self.message)

def error_handler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except StoryGenerationError as e:
            error_response = {
                "error": True,
                "message": str(e.message),
                "error_code": e.error_code,
                "location": e.error_location,
                "timestamp": e.timestamp,
                "type": "StoryGenerationError"
            }
            logger.error(f"StoryGenerationError: {error_response}")
            return jsonify(error_response), 500
        except Exception as e:
            error_info = {
                "error": True,
                "message": str(e),
                "type": type(e).__name__,
                "location": {
                    "file": traceback.extract_tb(sys.exc_info()[2])[-1].filename,
                    "line": traceback.extract_tb(sys.exc_info()[2])[-1].lineno,
                    "function": traceback.extract_tb(sys.exc_info()[2])[-1].name
                },
                "timestamp": datetime.now().isoformat(),
                "traceback": traceback.format_exc()
            }
            logger.error(f"Unexpected error: {error_info}")
            return jsonify(error_info), 500
    return wrapper

def callback_function_story(result):
    try:
        global story_result
        if not result:
            raise StoryGenerationError(
                message="Story generation returned empty result",
                error_code="EMPTY_STORY",
                error_location="callback_function_story"
            )
        story_result = result
        logger.info(f"Story generation successful: {len(result)} characters")
    except Exception as e:
        logger.error(f"Error in story callback: {str(e)}")
        raise StoryGenerationError(
            message=f"Story callback failed: {str(e)}",
            error_code="CALLBACK_ERROR",
            error_location="callback_function_story"
        )

def callback_function_voiceover_lines(result):
    try:
        global voiceover_result
        if not result:
            raise StoryGenerationError(
                message="Voiceover generation returned empty result",
                error_code="EMPTY_VOICEOVER",
                error_location="callback_function_voiceover_lines"
            )
        voiceover_result = result
        logger.info(f"Voiceover generation successful: {len(result.split(chr(10)))} lines")
    except Exception as e:
        logger.error(f"Error in voiceover callback: {str(e)}")
        raise StoryGenerationError(
            message=f"Voiceover callback failed: {str(e)}",
            error_code="CALLBACK_ERROR",
            error_location="callback_function_voiceover_lines"
        )

@app.route('/', methods=['GET'])
@error_handler
def home():
    return jsonify({
        "status": "Server is running",
        "instructions": "Send POST request to /generate with a prompt in JSON format",
        "example": {
            "prompt": "Your story prompt here"
        }
    })

@app.route('/generate', methods=['POST'])
@error_handler
def generate():
    global story_result, voiceover_result
    story_result = None
    voiceover_result = None
    
    # Request validation
    try:
        data = request.get_json()
        if not data:
            raise StoryGenerationError(
                message="No JSON data provided in request",
                error_code="INVALID_REQUEST",
                error_location="generate:request_validation"
            )
    except Exception as e:
        raise StoryGenerationError(
            message=f"Invalid JSON in request: {str(e)}",
            error_code="INVALID_JSON",
            error_location="generate:json_parsing"
        )

    # Prompt validation
    prompt = data.get('prompt')
    if not prompt:
        raise StoryGenerationError(
            message="No prompt provided in request",
            error_code="MISSING_PROMPT",
            error_location="generate:prompt_validation"
        )
    
    if not isinstance(prompt, str) or not prompt.strip():
        raise StoryGenerationError(
            message="Invalid prompt format or empty prompt",
            error_code="INVALID_PROMPT",
            error_location="generate:prompt_validation"
        )

    logger.info(f"Starting story generation for prompt: {prompt[:100]}...")

    try:
        # Run story generation workflow
        agents_workflow(
            prompt=prompt,
            animation_style="Superhero"
        )

        # Prepare response
        response = {
            "prompt": prompt,
            "message": "Story generation completed successfully.",
            "story": story_result,
            "voiceover": voiceover_result
        }

        logger.info("Story generation completed successfully")
        return jsonify(response), 200

    except Exception as e:
        raise StoryGenerationError(
            message=f"Error during story generation: {str(e)}",
            error_code="GENERATION_ERROR",
            error_location="generate:workflow_execution"
        )

@app.route('/health', methods=['GET'])
@error_handler
def health_check():
    try:
        return jsonify({
            "status": "healthy",
            "story_status": "ready" if story_result is None else "completed",
            "last_error": None
        })
    except Exception as e:
        raise StoryGenerationError(
            message=f"Health check failed: {str(e)}",
            error_code="HEALTH_CHECK_ERROR",
            error_location="health_check"
        )

if __name__ == '__main__':
    try:
        print("\n=== Story Generation Server ===")
        print("Server starting on http://localhost:5055")
        print("Available endpoints:")
        print(" - POST /generate : Generate story from prompt")
        print(" - GET /health   : Check server status")
        print(" - GET /        : View API documentation")
        print("\nLogging to: app.log")
        
        app.run(host='0.0.0.0', port=5055, debug=False, threaded=True)
    except Exception as e:
        logger.critical(f"Failed to start server: {str(e)}")
        sys.exit(1)