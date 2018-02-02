import type { Reducers } from 'client/reducers/index';

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type ReduxState = $ObjMap<Reducers, $ExtractFunctionReturn>;
