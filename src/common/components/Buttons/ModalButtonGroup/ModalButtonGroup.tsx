import React from 'react';

import styles from './ModalButtonGroup.module.scss';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { MultiButton } from 'common/components/Buttons/MultiButton/MultiButton';

type PropsType = {
  onClose: () => void;
  isValid: boolean;
  dirty: boolean;
};
export const ModalButtonGroup: React.FC<PropsType> = ({ onClose, isValid, dirty }) => {
  return (
    <div className={styles.buttonGroup}>
      <MultiButton label="Cancel" onClick={onClose} color="white" />
      <GeneralButton label="Save" type="submit" disabled={!isValid || !dirty} />
    </div>
  );
};
