
const _HALF_PI  = Math.PI / 2;

export default {

  Linear: {
    easeNone: function(t) { return t; }
  },

  Sine: {
    easeIn: function(t) { return -Math.cos(t * _HALF_PI) + 1; },
    easeOut: function(t) { return Math.sin(t * _HALF_PI); },
    easeInOut: function(t) { return -0.5 * (Math.cos(Math.PI * t) - 1); }
  },

  Quad: {
    easeIn: function(t) { return t * t; },
    easeOut: function(t) { return t * (2 - t); },
    easeInOut: function(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  },

  Cubic: {
    easeIn: function(t) { return t * t * t; },
    easeOut: function(t) { return (--t) * t * t + 1; },
    easeInOut: function(t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
  },

  Quart: {
    easeIn: function(t) { return t * t * t * t; },
    easeOut: function(t) { return 1 - (--t) * t * t * t; },
    easeInOut: function(t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; }
  },

  Quint: {
    easeInoui : function(t) { return t * t * t * t * t; },
    easeOut: function(t) { return 1 + (--t) * t * t * t * t; },
    easeInOut: function(t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
  },

  Expo: {
    easeIn: function(t) { return Math.pow(2, 10 * (t - 1)) - 0.001; },
    easeOut: function(t) { return 1 - Math.pow(2, -10 * t); },
    easeInOut: function(t) { return ((t *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))); }
  },

  Circ: {
    easeIn: function(t) { return -(Math.sqrt(1 - (t * t)) - 1); },
    easeOut: function(t) { return Math.sqrt(1 - (t = t - 1) * t); },
    easeInOut: function(t) { return ((t *= 2) < 1) ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1); }
  }

};