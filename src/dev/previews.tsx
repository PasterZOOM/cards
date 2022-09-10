import React from 'react';

import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';

import { PaletteTree } from './palette';

import { App } from 'app/App';
import { MultiButton } from 'common/components/Buttons/MultiButton/MultiButton';
import { ClearParams } from 'common/components/ClearParams/ClearParams';
import { DataTable } from 'common/components/DataTable/DataTable';
import { Error404 } from 'common/components/Error404/Error404';
import { Packs } from 'features/Cards/Packs/Packs';

const ComponentPreviews: React.FC = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/MultiButton">
        <MultiButton label="Button" color="red" type="button" />
      </ComponentPreview>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/DataTable">
        <DataTable tableType="packs" />
      </ComponentPreview>
      <ComponentPreview path="/Packs">
        <Packs />
      </ComponentPreview>
      <ComponentPreview path="/ClearParams">
        <ClearParams params={[]} />
      </ComponentPreview>
      <ComponentPreview path="/Error404">
        <Error404 />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
