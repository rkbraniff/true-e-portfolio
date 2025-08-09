import type { NavigateFunction, Location, Params } from "react-router-dom";

export interface RouterProps {
    navigate: NavigateFunction;
    location: Location;
    params: Readonly<Params<string>>;
}