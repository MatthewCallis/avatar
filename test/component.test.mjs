/* eslint-disable import/extensions, import/no-extraneous-dependencies, jsdoc/require-jsdoc, node/no-missing-import */
import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import Component, { sourceLogic } from '../esm/AvatarComponent.js';

function componentToJson(component) {
  if (Array.isArray(component)) {
    return component.map(componentToJson);
  }

  let name;
  if (component.type && (component.type.displayName || component.type.name)) {
    name = component.type.displayName || component.type.name;
  } else if (component.type) {
    name = component.type;
  } else {
    return component;
  }

  let children;
  if (component.props && component.props.children) {
    children = component.props.children;
    children = Array.isArray(children) ? children : [children];
    children = children.map(componentToJson);
  }

  return {
    name,
    props: component.props,
    children,
  };
}

test('sourceLogic: primarySource', (t) => {
  const setSource = sinon.spy();
  sourceLogic(setSource, { primarySource: 'primarySource' });
  t.true(setSource.calledWith('primarySource'));
});

test('sourceLogic: useGravatar', (t) => {
  const setSource = sinon.spy();
  sourceLogic(setSource, { useGravatar: true, size: 'test', email: 'test', hash: 'test', fallback: 'test', rating: 'test', forcedefault: 'test' });
  t.true(setSource.calledWith('https://secure.gravatar.com/avatar/test?s=80&d=test&r=test&f=y'));
});

test('sourceLogic: githubId', (t) => {
  const setSource = sinon.spy();
  sourceLogic(setSource, { useGravatar: false, size: 'test', githubId: 'test' });
  t.true(setSource.calledWith('https://avatars.githubusercontent.com/u/test?s=test&v=4'));
});

test('sourceLogic: initials', (t) => {
  const setSource = sinon.spy();
  sourceLogic(setSource, { useGravatar: false, size: 80, width: 80, height: 80, initials: 'MC', offsetX: 1, offsetY: 1, background: '#ffffff', color: '#000000', fontFamily: 'Helvetica', fontSize: 16, fontWeight: 400 });
  t.true(setSource.calledWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAABlElEQVR4nO3TMYoiYRBA4ZoBNfEABp0oJsZexBOImYlBJ+pFPIBo2LfoG3QqiAfwACZKbbCDMCyzu8yD0WHel/4VFI/6IyKyaZqs6zojIne7Xer/vcabfr8fERHH4zE+slqtYrFYfPj+E90DFkURo9EoqqqK2+32x+D5fI7NZhOtVutLF/wOsmmazMzc7/cZEVmWZV6v1/uZXi6XnEwm2e1283Q6PeizPKd3ATMzl8tlRkQOBoOczWY5nU6zKIrsdDpZVdUDV31OL+v1OsuyjF6vdz/Juq5ju93G4XCIdrsd4/E45vN5DIfDB32S5/WS+fsM9Tmv/x7R3xgQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCP0CeN2x7RPgH5gAAAAASUVORK5CYII='));
});

test('sourceLogic: fallbackImage', (t) => {
  const setSource = sinon.spy();
  sourceLogic(setSource, { useGravatar: false, initials: '', fallbackImage: 'test' });
  t.true(setSource.calledWith('test'));
});

test('Component renders', (t) => {
  const dom = componentToJson(/* #__PURE__ */React.createElement(Component, null));
  t.deepEqual(dom, {
    props: {
      alt: '',
      background: '#f4f6f7',
      classes: '',
      color: '#888888',
      email: '',
      fallback: 'mm',
      fallbackImage: 'data:image/svg+xml,%3Csvg width=\'60\' xmlns=\'http://www.w3.org/2000/svg\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath fill=\'%23bcc7ce\' d=\'M0 0h60v60h-60z\'/%3E%3Cg fill-rule=\'evenodd\'%3E%3Cpath fill=\'%23a4b1b9\' d=\'M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z\'/%3E%3Cpath fill=\'%23fff\' d=\'M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z\'/%3E%3C/g%3E%3C/svg%3E',
      fontFamily: '\'Sofia\', \'Helvetica Neue\', sans-serif',
      fontSize: 0,
      fontWeight: 100,
      forcedefault: false,
      githubId: 0,
      hash: '',
      height: undefined,
      initials: '',
      offsetX: undefined,
      offsetY: undefined,
      primarySource: '',
      rating: 'x',
      size: 80,
      title: '',
      useGravatar: true,
      useGravatarFallback: false,
      width: undefined,
    },
    children: undefined,
    name: 'AvatarComponent',
  });
});

test('Component executes', (t) => {
  const setSource = sinon.spy();
  sinon.stub(React, 'useState').callsFake(() => ['', setSource]);
  sinon.stub(React, 'useEffect').callsFake(() => true);
  t.notThrows(() => Component({}));
});
