'use strict';

var _RadioGroup;

function _load_RadioGroup() {
  return _RadioGroup = _interopRequireDefault(require('../RadioGroup'));
}

var _react = _interopRequireWildcard(require('react'));

var _reactDom = _interopRequireDefault(require('react-dom'));

var _testUtils;

function _load_testUtils() {
  return _testUtils = _interopRequireDefault(require('react-dom/test-utils'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} = (_testUtils || _load_testUtils()).default; /**
                                                * Copyright (c) 2017-present, Facebook, Inc.
                                                * All rights reserved.
                                                *
                                                * This source code is licensed under the BSD-style license found in the
                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                *
                                                * 
                                                * @format
                                                */

/* global Element */

describe('RadioGroup', () => {
  it('honors the selectedIndex param', () => {
    const component = renderIntoDocument(
    // $FlowFixMe(>=0.53.0) Flow suppress
    _react.createElement((_RadioGroup || _load_RadioGroup()).default, { optionLabels: ['foo', 'bar'], selectedIndex: 1 }));
    expect(component.props.selectedIndex).toBe(1);

    const radioInputs = scryRenderedDOMComponentsWithTag(component, 'input');

    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs[0]).checked).toBe(false);
    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs[1]).checked).toBe(true);
  });

  it('should use the correct, unique radio group name', () => {
    const props = { optionLabels: ['foo', 'bar'], selectedIndex: 1 };
    // $FlowFixMe(>=0.53.0) Flow suppress
    const component = renderIntoDocument(_react.createElement((_RadioGroup || _load_RadioGroup()).default, props));
    const radioInputs = scryRenderedDOMComponentsWithTag(component, 'input');
    // Global uid is `1` as this point, since this is the second RadioGroup component to be created.
    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs[0]).getAttribute('name')).toEqual('radiogroup-1');
    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs[1]).getAttribute('name')).toEqual('radiogroup-1');
    const component2 = renderIntoDocument(_react.createElement((_RadioGroup || _load_RadioGroup()).default, props));
    const radioInputs2 = scryRenderedDOMComponentsWithTag(component2, 'input');
    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs2[0]).getAttribute('name')).toEqual('radiogroup-2');
    // $FlowFixMe
    expect(_reactDom.default.findDOMNode(radioInputs2[1]).getAttribute('name')).toEqual('radiogroup-2');
  });

  it('calls its onSelectedChange handler when a radio input is changed', () => {
    const onSelectedChange = jasmine.createSpy('onSelectedChange');

    const props = {
      optionLabels: ['foo', 'bar'],
      selectedIndex: 0,
      onSelectedChange
    };
    // $FlowFixMe(>=0.53.0) Flow suppress
    const component = renderIntoDocument(_react.createElement((_RadioGroup || _load_RadioGroup()).default, props));
    const radioInputs = scryRenderedDOMComponentsWithTag(component, 'input');
    const secondRadioElement = radioInputs[1];

    if (!(secondRadioElement instanceof Element)) {
      throw new Error('Invariant violation: "secondRadioElement instanceof Element"');
    }

    const foundRadio = _reactDom.default.findDOMNode(secondRadioElement);

    if (!(foundRadio instanceof Element)) {
      throw new Error('Invariant violation: "foundRadio instanceof Element"');
    }

    Simulate.change(foundRadio);
    expect(onSelectedChange.mostRecentCall.args[0]).toEqual(1);
  });
});