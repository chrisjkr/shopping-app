import RootStore from "../stores/RootStore";
import type {BaseScreenProps} from "./BaseScreenProps";

export type ObserverScreenProps = BaseScreenProps & {
  store: RootStore,
}
