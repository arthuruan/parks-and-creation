import argparse
import os.path
from setup import initial_setup
from routine import routine

def main():
    args = parse_args()

    data_path = args.data_file
    debug = args.debug

    if args.config_mode != False:
        initial_setup(data_path, args.config_mode)
        return

    if not os.path.isfile(data_path):
        print("[ERROR] Could not find coordinates configuration file! Run with --config {id}")
        return   

    routine(data_path, debug)


def parse_args():
    parser = argparse.ArgumentParser(description='Generates Coordinates File')

    parser.add_argument("--config",
                        dest="config_mode",
                        # action=argparse.BooleanOptionalAction,
                        default=False,
                        help="Enter configuration mode for provided sector name")
    
    parser.add_argument("--data",
                        dest="data_file",
                        default="data/coordinates.json",
                        help="Data file to be used with OpenCV")
    
    parser.add_argument("--debug",
                        dest="debug",
                        action=argparse.BooleanOptionalAction,
                        default=False,
                        help="Start debug")

    return parser.parse_args()


if __name__ == '__main__':
    main()
