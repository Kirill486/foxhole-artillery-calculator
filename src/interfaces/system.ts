import {FC} from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ApplicationState } from "../store/store";

// A Component that calculates props for an underlying tree is Higher-Order
export type HOC = FC<{}>;

// Selectors select from the ApplicationState
export const useAppSelector = useSelector as TypedUseSelectorHook<ApplicationState>;
export type GenericSelector<State, Result> = (state: State) => Result;
export type Selector<Result> = GenericSelector<ApplicationState, Result>;
