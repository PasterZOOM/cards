import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { getPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsSelectors';

export const useBack = (): string => {
  const params = useAppSelector(getPacksParams);
  const queryParams: Array<string> = [];

  Object.entries(params).forEach(param => {
    if (param[1] !== undefined) queryParams.push(`${[param[0]]}=${param[1]}&`);
  });

  return `${path.PACKS}?${queryParams.join('')}`;
};
