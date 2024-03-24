/// When blockHotkeys is true, space key presses will not be hijacked to control
/// audio transport state.
class HotkeySuppressor {
  blockHotkeys: boolean = false;
}

export const hotkeySuppressor = new HotkeySuppressor();
