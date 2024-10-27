import sys
import logging
from flask import Flask
import traceback

def run_server_with_debug():
    """
    Run Flask server with enhanced error handling and logging
    """
    try:
        # Configure more detailed logging
        logging.basicConfig(
            level=logging.DEBUG,  # Set to DEBUG for maximum detail
            format='%(asctime)s %(levelname)s [%(filename)s:%(lineno)d] %(message)s',
            handlers=[
                logging.FileHandler('server_debug.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        logger = logging.getLogger(__name__)
        
        # Import your app (this will catch import errors)
        logger.info("Attempting to import app.py...")
        from app import app
        
        # Test that key components are properly initialized
        logger.info("Checking Flask app configuration...")
        assert isinstance(app, Flask), "app is not a valid Flask instance"
        
        # Import and verify agents_workflow
        logger.info("Verifying agents_workflow module...")
        from agents_workflow_ import agents_workflow
        assert callable(agents_workflow), "agents_workflow is not callable"
        
        logger.info("All checks passed. Starting server...")
        app.run(host='0.0.0.0', port=5055, debug=True)
        
    except ImportError as e:
        logger.error(f"Import error: {str(e)}\n{traceback.format_exc()}")
        print(f"\nERROR: Failed to import required module: {str(e)}")
        sys.exit(1)
    except AssertionError as e:
        logger.error(f"Configuration error: {str(e)}\n{traceback.format_exc()}")
        print(f"\nERROR: Invalid configuration: {str(e)}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}\n{traceback.format_exc()}")
        print(f"\nERROR: An unexpected error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    run_server_with_debug()