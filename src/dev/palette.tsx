import React from 'react';

import { Category, Component, Variant, Palette } from '@react-buddy/ide-toolbox';
import MUIPalette from '@react-buddy/palette-mui';

export const PaletteTree: React.FC = () => (
  <Palette>
    <Category name="HTML">
      <Component name="a">
        <Variant requiredParams={['href']}>
          <a href="/">Link</a>
        </Variant>
      </Component>
      <Component name="button">
        <Variant>
          <button type="button">Button</button>
        </Variant>
      </Component>
    </Category>
    <MUIPalette />
  </Palette>
);
