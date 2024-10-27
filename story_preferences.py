"""
Story Preferences Module
=======================

This module provides functionality to create and manage story or scan preferences
with various customization options.

Installation
-----------
Save this file as `story_preferences.py` in your project directory.

Usage
-----
Basic usage:

    from story_preferences import get_story_preferences
    
    # For a simple scan
    result = get_story_preferences(
        action="Scan",
        animation_style="Toon"
    )
    
    # For a story with prompt
    result = get_story_preferences(
        action="Prompt",
        animation_style="Superhero",
        prompt="A hero's journey",
        subtitles=True,
        age_group="7-11 years",
        transition_type="fade"
    )

Parameters
----------
action : str
    Must be either "Scan" or "Prompt"
animation_style : str
    Must be either "Superhero" or "Toon"
prompt : str, optional
    Required if action is "Prompt"
subtitles : bool, optional
    Whether to include subtitles
age_group : str, optional
    One of: "2-6 years", "7-11 years", "12-14 years", 
            "15-17 years", "Prefer not to say"
transition_type : str, optional
    One of: "fade", "slide", "crossfade"

Returns
-------
dict
    A dictionary containing all preferences and a formatted output string

Raises
------
ValueError
    If any parameters are invalid or required parameters are missing
"""

from typing import Optional, Dict, Union

# Constants
VALID_ACTIONS = ["Scan", "Prompt"]
VALID_ANIMATION_STYLES = ["Superhero", "Toon"]
VALID_AGE_GROUPS = [
    "2-6 years",
    "7-11 years",
    "12-14 years",
    "15-17 years",
    "Prefer not to say"
]
VALID_TRANSITIONS = ["fade", "slide", "crossfade"]


def get_story_preferences(
    action: str,
    animation_style: str,
    prompt: Optional[str] = None,
    subtitles: Optional[bool] = None,
    age_group: Optional[str] = None,
    transition_type: Optional[str] = None
) -> Dict[str, Union[str, bool, None]]:
    """
    Creates story preferences based on provided arguments.
    
    Args:
        action (str): Must be either "Scan" or "Prompt"
        animation_style (str): Must be either "Superhero" or "Toon"
        prompt (Optional[str]): Required if action is "Prompt"
        subtitles (Optional[bool]): Whether to include subtitles
        age_group (Optional[str]): One of the valid age groups
        transition_type (Optional[str]): One of "fade", "slide", "crossfade"
    
    Returns:
        Dict containing all preferences and formatted output string
    
    Raises:
        ValueError: If any arguments are invalid
    
    Examples:
        >>> # Simple scan with minimal parameters
        >>> result = get_story_preferences(
        ...     action="Scan",
        ...     animation_style="Toon"
        ... )
        >>> print(result['output'])
        'The user wants a scan with the 'Toon' animation style.'
        
        >>> # Full story with all parameters
        >>> result = get_story_preferences(
        ...     action="Prompt",
        ...     animation_style="Superhero",
        ...     prompt="A hero's journey",
        ...     subtitles=True,
        ...     age_group="7-11 years",
        ...     transition_type="fade"
        ... )
        >>> print(result['output'])
        'The user wants the story 'A hero's journey' with the 'Superhero' animation style. 
         Targeted age group: 7-11 years. Subtitles are included. Transition type: fade.'
    """
    preferences = {}
    
    # Validate action
    if action not in VALID_ACTIONS:
        raise ValueError(f"Action must be one of {VALID_ACTIONS}")
    preferences['action'] = action
    
    # Validate animation style
    if animation_style not in VALID_ANIMATION_STYLES:
        raise ValueError(f"Animation style must be one of {VALID_ANIMATION_STYLES}")
    preferences['animation_style'] = animation_style
    
    # Validate prompt
    if action == "Prompt" and not prompt:
        raise ValueError("Prompt is required when action is 'Prompt'")
    preferences['prompt'] = prompt if action == "Prompt" else None
    
    # Validate age group
    if age_group and age_group not in VALID_AGE_GROUPS:
        raise ValueError(f"Age group must be one of {VALID_AGE_GROUPS}")
    preferences['age_group'] = age_group
    
    # Validate transition type
    if transition_type:
        transition_type = transition_type.lower()
        if transition_type not in VALID_TRANSITIONS:
            raise ValueError(f"Transition type must be one of {VALID_TRANSITIONS}")
    preferences['transition_type'] = transition_type
    
    # Store subtitles preference
    preferences['subtitles'] = subtitles
    
    # Generate formatted output
    output = []
    
    # Add core storyline
    if preferences['action'] == "Prompt" and preferences['prompt']:
        output.append(
            f"The user wants the story '{preferences['prompt']}' "
            f"with the '{preferences['animation_style']}' animation style."
        )
    else:
        output.append(
            f"The user wants a scan with the '{preferences['animation_style']}' "
            "animation style."
        )
    
    # Add optional information
    if preferences['age_group']:
        output.append(f"Targeted age group: {preferences['age_group']}.")
    if preferences['subtitles'] is not None:
        output.append(
            "Subtitles are included." if preferences['subtitles'] 
            else "Subtitles are not included."
        )
    if preferences['transition_type']:
        output.append(f"Transition type: {preferences['transition_type']}.")
    
    preferences['output'] = " ".join(output)
    return preferences


"""
# ===============================================
# Example Usage and Testing (Reference Only)
# ===============================================

def main():
    '''
    Example usage of the get_story_preferences function.
    This main function demonstrates various use cases and error handling scenarios.
    
    Test Cases Demonstrated:
    1. Full functionality with all parameters
    2. Minimal functionality with required parameters only
    3. Partial functionality with some optional parameters
    4. Error handling for invalid inputs (commented out examples)
    '''
    try:
        # Example 1: Full Feature Usage
        result1 = get_story_preferences(
            action="Prompt",
            animation_style="Superhero",
            prompt="A hero's journey to save the world",
            subtitles=True,
            age_group="7-11 years",
            transition_type="fade"
        )
        print("\nExample 1:", result1['output'])
        
        # Example 2: Minimal Feature Usage
        result2 = get_story_preferences(
            action="Scan",
            animation_style="Toon"
        )
        print("\nExample 2:", result2['output'])
        
        # Example 3: Partial Feature Usage
        result3 = get_story_preferences(
            action="Prompt",
            animation_style="Toon",
            prompt="A funny story about a cat",
            subtitles=True
        )
        print("\nExample 3:", result3['output'])
        
    except ValueError as e:
        print(f"Validation Error: {e}")
    except Exception as e:
        print(f"Unexpected Error: {e}")

if __name__ == "__main__":
    main()
"""