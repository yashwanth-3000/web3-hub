import re

def extract_voiceover_lines(script):
    """
    Extracts voiceover lines from the script text.
    Returns a list of voiceover lines.
    """
    pattern = re.compile(r'Voiceover Line: "(.*?)"')
    matches = pattern.findall(script)
    return matches

def extract_image_prompts(script):
    """
    Extracts image prompts from the script text and formats them as a dictionary
    with keys like 'v1-img1', 'v1-img2', etc.
    Returns a dictionary of image prompts.
    """
    result = {}
    
    # Pattern to match voiceover sections with their image prompts
    section_pattern = re.compile(r'Voiceover Line: ".*?"\s*Image Prompts:\s*((?:\d+. ".*?"\s*)+)')
    # Pattern to match individual image prompts
    image_pattern = re.compile(r'\d+. "(.*?)"')
    
    # Find all voiceover sections
    sections = section_pattern.finditer(script)
    
    # Process each section
    for v_index, section in enumerate(sections, 1):
        # Extract all image prompts in this section
        image_prompts = image_pattern.findall(section.group(1))
        
        # Add each image prompt to the result dictionary
        for img_index, prompt in enumerate(image_prompts, 1):
            key = f'v{v_index}-img{img_index}'
            result[key] = prompt.strip()
    
    return result

# Example usage:
"""
voiceover_lines = extract_voiceover_lines(script)
image_prompts = extract_image_prompts(script)

print("Voiceover Lines:")
for line in voiceover_lines:
    print(line)

print("\nImage Prompts:")
for key, prompt in image_prompts.items():
    print(f"{key}: {prompt}")
"""