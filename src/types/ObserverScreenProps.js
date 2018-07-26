import RootStore from "../stores/RootStore";
import type {BaseScreenProps} from "./BaseScreenProps";

type BaseProps = {
  store: RootStore,
}

export type ObserverScreenProps = BaseScreenProps & BaseProps
