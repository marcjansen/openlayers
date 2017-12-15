import _ol_Map_ from '../../../../src/ol/Map.js';
import _ol_MapBrowserEvent_ from '../../../../src/ol/MapBrowserEvent.js';
import _ol_View_ from '../../../../src/ol/View.js';
import _ol_events_Event_ from '../../../../src/ol/events/Event.js';
import Interaction from '../../../../src/ol/interaction/Interaction.js';
describe('ol.interaction.KeyboardPan', function() {
  var map;

  beforeEach(function() {
    map = new _ol_Map_({
      target: createMapDiv(100, 100),
      view: new _ol_View_({
        center: [0, 0],
        resolutions: [1],
        zoom: 0
      })
    });
    map.renderSync();
  });
  afterEach(function() {
    disposeMap(map);
  });

  describe('handleEvent()', function() {
    it('pans on arrow keys', function() {
      var spy = sinon.spy(Interaction, 'pan');
      var event = new _ol_MapBrowserEvent_('keydown', map, {
        type: 'keydown',
        target: map.getTargetElement(),
        preventDefault: _ol_events_Event_.prototype.preventDefault
      });
      event.originalEvent.keyCode = 40; // DOWN
      map.handleMapBrowserEvent(event);
      event.originalEvent.keyCode = 38; // UP
      map.handleMapBrowserEvent(event);
      event.originalEvent.keyCode = 37; // LEFT
      map.handleMapBrowserEvent(event);
      event.originalEvent.keyCode = 39; // RIGHT
      map.handleMapBrowserEvent(event);
      expect(spy.getCall(0).args[1]).to.eql([0, -128]);
      expect(spy.getCall(1).args[1]).to.eql([0, 128]);
      expect(spy.getCall(2).args[1]).to.eql([-128, 0]);
      expect(spy.getCall(3).args[1]).to.eql([128, 0]);
      Interaction.pan.restore();
    });
  });

});
