# Beatsequence

Check it out at [beatsequence.com](https://beatsequence.com/)

## Project Info

This is a little beat maker pet project I built a few years ago as I was learning React. It was inspired a bit by the [Arturia BeatStep Pro](https://www.arturia.com/products/hybrid-synths/beatstep-pro/overview) hardware sequencer. It features synthesized kick, snare, closed hi-hat, sine osc, and square osc tracks all with basic parameter controls. The sequencer can be randomized, and each track has a "chance" parameter that controls the probability of each enabled step being triggered.

Feel free to use this repo as a starting point

## Dependencies

- [Yarn](https://yarnpkg.com/): `brew install yarn`
- [Parcel](https://parceljs.org/getting-started/webapp/): `yarn add --dev parcel`

## Running the dev server

1. Run `yarn install`
2. Navigate to [http://localhost:1234](http://localhost:1234)

## Architecture

- Communication with the backend is shielded by the "ports" abstraction. This simply defines abstract interfaces for the various backend-reliant functions: logging in, signing up, saving/loading a project, etc. The app currently uses Firebase as a backend, but none of the application code is aware of this detail. To use a different provider, add new adapters (see /adapters for the Firebase implementation), and update PortProvider.ts to inject the appropriate adapters.
- One-off components that aren't intended to be shared live in /components
- Reusable components live in /shared-components
- Making sound:
  - The audio engine and sequencer live in /engine
  - The sequencer builds on top of Tone.js's sequencer by adding support for randomization and scale locking, but Tone.js is responsible for driving the main sequence scheduler.
  - Sound generators live in /generators. Generators also leverage Tone.js, which build on top of the WebAudio API. They all implement the generator interface, which has a single trigger() function that is called when they should play.
- State management:
  - Uses Redux toolkit
  - State is typically fetched via the useAppSelector() hook and via useAppDispatch()
  - App-specific entities can be found in /entities
- The UI makes heavy use of [Mui](https://mui.com/) components
