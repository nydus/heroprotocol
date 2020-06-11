# heroprotocol

![Works with Node 8](https://img.shields.io/badge/node-%208-brightgreen)
![Works with Node 10](https://img.shields.io/badge/node-%2010-brightgreen)
![Works with Node 12](https://img.shields.io/badge/node-%2012-brightgreen)
![Works with Node 14](https://img.shields.io/badge/node-%2014-brightgreen)

***2018-12 Update** Since Blizzard has decided to effectively kill Heroes of the Storm by ending all competitive esports entirely, shifting developers off the game, and “changing the cadence” of updates, I have no longer cared about the game and have halted all development.  Shame, as it was a beloved game for me, but seeing as they completely dropped by the ball by failing to bring the game to market in a timely manner to compete in the MOBA space, my updates to this project will be considered few and very far between.*

**heroprotocol** is a Javascript port of [Blizzard/heroprotocol](https://github.com/Blizzard/heroprotocol).
It is a library and standalone tool to decode Heroes of the Storm replay files into Javascript data
structures.

Currently **heroprotocol** can decode these structures and events:

- replay header
- game details
- replay init data
- game events
- message events
- tracker events

**heroprotocol** can be used as a base-build-specific library to decode binary blobs, or it can be run as a standalone tool to pretty print information from supported replay files.

The latest version of this library has been tested and passed with build 44256 of HoTS replays. Although it is unlikely that you should encounter any issues for older versions, no testing has been done for any replays older than 44256 nor future replays.

Note that **heroprotocol** does not expose game balance information or provide any kind of high level analysis of replays; it's meant to be just the first tool in the chain for your data mining application.

As of version 2.0, MacOS and Linux are using a compiled library (e.g. C++, as opposed to interpreted library, e.g. Javascript) for extraction ([`storm-replay`](https://github.com/nydus/storm-replay)) and results in about 40% faster processing.  If you are on Windows, please upgrade.

## What The Fork?

I first want to thank Mathieu Merdy ([Farof](https://github.com/Farof)) for doing most of the work
on this repo in his origin repository [heroprotocoljs](https://github.com/Farof/heroprotocoljs).
I, in no way, want to steal credit or cause confusion.

The reason for this fork is to keep up with my speed of development and implement the features I
believe should be the extraction library.

Mathieu did a wonderful job with the initial import and product direction, but unfortunately has
not been as active on the product as I have hoped.  It is with regret that I have to fork to
continue development, but I hope that Mathieu understands and continues development.

## Installation

    npm install heroprotocol --save

## Usage

### As a library

An usage example is provided in the "example" folder. It displays the map name and players name.

    const heroprotocol = require('../');

    const file = process.argv[2];

    const details = heroprotocol.get(heroprotocol.DETAILS, file);

    if (details) {
      const players = details.m_playerList.map(player => player.m_name.toString());

      console.log('Map:', details.m_title);
      console.log('Players:', players.sort());
    }

Output:

    Map: Battlefield of Eternity
    Players: […]

### As a command line tool

    $ node bin/heroprotocol.js map.StormReplay -H --json

  Outputs the `map.StormReplay` replay header in JSON format.

    usage: heroprotocol.js replayFile [--help] [--gameevents] [--messageevents]
    [--trackerevents] [--attributeevents] [--header] [--details] [--initdata]
    [--stats] [--json]

    Options:
      -h, --help             show this help                                       [boolean]
      -H, --header           parse protocol header                                [boolean]
      -d, --details          parse protocol details                               [boolean]
      -i, --initdata         parse protocol initdata                              [boolean]
      -g, --gameevents       parse protocol gameevents                            [boolean]
      -m, --messageevents    parse protocol messageevents                         [boolean]
      -t, --trackerevents    parse protocol trackerevents                         [boolean]
      -a, --attributeevents  parse protocol attributeevents                       [boolean]
      -s, --stats            print SPlayerStatsEvent                              [boolean]
      --json                 prints in JSON format                                [boolean]

To extract everything, you can use the extraction tool provided:

    $ node bin/extract.js map.StormReplay extractionDir/ --pretty

Extracts `map.StormReplay` in the `extractionDir` directory in prettified JSON.

    usage: extract.js file|dir ... outdir [-h] [-p] [-r] [-v]

    Options:
    -h, --help       show this help                                      [boolean]

    -p, --pretty     prettifies the json                                 [boolean]

    -r, --recursive  scans input folders for replays recursively         [boolean]

    -v, --verbose    prints additional info                              [boolean]

## Data reference

The following files are in the archive and supported by the library:

- `replay.details` (see `reference/replay.details.md` for details)
- `replay.initdata` (see `reference/replay.initdata.md` for details)
- `replay.game.events`
- `replay.message.events` (see `reference/replay.message.events.md` for details)
- `replay.tracker.events` (see `reference/replay.tracker.events.md` for details)
- `replay.attributes.events`

Also accessible is the replay header (see `reference/header.md` for details).

The following files are in the archive but not supported by this port nor the original library yet:

- `replay.load.info`
- `replay.resumable.events`
- `replay.server.battlelobby`
- `replay.smartcam.events`
- `replay.sync.events`
- `replay.sync.history`

## Supported Versions

**heroprotocol** supports all protocols avalaible in the original library and can read all replays from retail versions of the game, up to and including patch 16.0. The plan is to port all future versions as they become available.

### How it works

Heroes of the Storm replay files are MPQ archives. **heroprotocol** uses the `mpyq` library to read and extract the binary content out of the archive. It then parses the binary content into data structures containing the replay information.

The three main files are:

- `decoders.js` - Contains the binary structures decoders. They are the same for all versions of the game.
- `protocol#####.js` - Contains the data structures description of a specific public release of the game.
- `heroprotocol.js` - Entry point. Exports the ReplayDecoder and provides the CLI.

`heroprotocol.js` starts by loading the earliest protocol available, `protocol29406.js` and uses it to parse the replay header. It then reads the replay build version in the header and loads the associated `protocol#####.js` containing the correct data structures to parse the full replay.

## Plans

What I always wanted for personal use is a bulk analyzer that takes all your replays and give you stats, so that's my end goal for now. If it goes well I'd like to provide a website for anyone to see their stats whithout having to install this tool. Along the way I hope I can provide tools to read individual or multiple replays and all information associated in a friendlier way than Blizzard's data structures. I would also like to build a reference for those data structure. Finally I would like to explore the possibility of using this library directory in the browser, as while hard it's certainly feasible and would help third-party tool creation greatly.

Any small or big contribution appreciated whether in code, documentation, feedback or feature request.

## Acknowledgements

[Mathieu Merdy](https://github.com/Farof) for the initial implementation.

Blizzard Entertainment for making the awesome Heroes of the Storm game and releasing the original [heroprotocol](https://github.com/Blizzard/heroprotocol) tool.

The standalone tool uses a javascript port of [mpyq](https://github.com/arkx/mpyq/) to read mopaq files.

## License

Copyright (c) 2016, Justin J. Novack

Copyright (c) 2016, Mathieu Merdy

Copyright (c) 2015 Blizzard Entertainment

Open sourced under the ISC license and MIT license. See the included LICENSE file for more information.
