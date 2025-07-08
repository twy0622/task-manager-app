import os

def list_files_hierarchically(directory, indent=""):
    """
    Recursively lists all files in a directory in a hierarchical format.

    Args:
        directory (str): The path to the directory to scan.
        indent (str): The indentation string for formatting the hierarchy.

    Returns:
        None
    """
    # List all entries in the directory
    try:
        entries = os.listdir(directory)
    except PermissionError:
        print(f"{indent}Permission denied: {directory}")
        return

    # Iterate through each entry
    for entry in sorted(entries):
        full_path = os.path.join(directory, entry)
        if os.path.isdir(full_path):
            # If it's a directory, print its name and recurse
            print(f"{indent}├── {entry}/")
            list_files_hierarchically(full_path, indent + "│   ")
        else:
            # If it's a file, print its name
            print(f"{indent}├── {entry}")

# Example usage
if __name__ == "__main__":
    # Specify the directory to scan
    root_directory = input("Enter the directory path to scan: ").strip()
    
    # Validate the directory
    if os.path.isdir(root_directory):
        print(f"Hierarchical listing of files in: {root_directory}")
        list_files_hierarchically(root_directory)
    else:
        print("Invalid directory path.")
