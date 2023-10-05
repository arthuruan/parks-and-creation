import argparse
import os.path
from setup import initial_setup
from routine import routine

def main():
    args = parse_args()

    if not os.path.isfile(args.data_file):
        return

    if args.config_mode:
        initial_setup()

    routine()


def parse_args():
    parser = argparse.ArgumentParser(description='Generates Coordinates File')

    parser.add_argument("--config",
                        dest="config_mode",
                        action=argparse.BooleanOptionalAction,
                        default=False,
                        help="Enter configuration mode")
    
    parser.add_argument("--data",
                        dest="data_file",
                        default="data/coorditanes.yml",
                        help="Data file to be used with OpenCV")

    return parser.parse_args()


if __name__ == '__main__':
    main()
