
const format = (ax, ay, bx, by) => {
  return 'cubic-bezier(' + ax + ', ' + ay + ', ' + bx + ', ' + by + ')';
};

export default {

  Linear: {
    easeNone: format(0.250, 0.250, 0.750, 0.750)
  },

  Sine: {
    easeIn: format(0.470, 0.000, 0.745, 0.715),
    easeOut: format(0.390, 0.575, 0.565, 1.000),
    easeInOut: format(0.445, 0.050, 0.550, 0.950)
  },

  Quad: {
    easeIn: format(0.550, 0.085, 0.680, 0.530),
    easeOut: format(0.250, 0.460, 0.450, 0.940),
    easeInOut: format(0.455, 0.030, 0.515, 0.955)
  },

  Cubic: {
    easeIn: format(0.550, 0.055, 0.675, 0.190),
    easeOut: format(0.215, 0.610, 0.355, 1.000),
    easeInOut: format(0.645, 0.045, 0.355, 1.000)
  },

  Quart: {
    easeIn: format(0.895, 0.030, 0.685, 0.220),
    easeOut: format(0.165, 0.840, 0.440, 1.000),
    easeInOut: format(0.770, 0.000, 0.175, 1.000)
  },

  Quint: {
    easeIn: format(0.755, 0.050, 0.855, 0.060),
    easeOut: format(0.230, 1.000, 0.320, 1.000),
    easeInOut: format(0.860, 0.000, 0.070, 1.000)
  },

  Expo: {
    easeIn: format(0.950, 0.050, 0.795, 0.035),
    easeOut: format(0.190, 1.000, 0.220, 1.000),
    easeInOut: format(1.000, 0.000, 0.000, 1.000)
  },

  Circ: {
    easeIn: format(0.600, 0.040, 0.980, 0.335),
    easeOut: format(0.075, 0.820, 0.165, 1.000),
    easeInOut: format(0.785, 0.135, 0.150, 0.860)
  },

  Back: {
    easeIn: format(0.600, -0.280, 0.735, 0.045),
    easeOut: format(0.175, 0.885, 0.320, 1.275),
    easeInOut: format(0.680, -0.550, 0.265, 1.550)
  }

};