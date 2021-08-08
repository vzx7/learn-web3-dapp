import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect} from 'components/protocols/polygon/components/steps';
import { appStateReducer, initialState, PolygonContext } from 'components/protocols/polygon/context'
import { useAppState, useLocalStorage } from 'components/protocols/polygon/hooks'
import { Sidebar, Step } from 'components/protocols/polygon/components/layout'
import { Nav } from 'components/protocols/polygon/components';
import type { AppI } from 'components/protocols/polygon/types';

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const PolygontApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];
    const nextHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index + 1
        })
    }
    const prevHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index - 1
        })
    }
    const isFirstStep = state.index == 0;
    const isLastStep = state.index === steps.length - 1;

    return (
        <Row>
        <Sidebar
            steps={steps}
            stepIndex={state.index}
        />
        <Step
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            prev={prevHandler}
            next={nextHandler}
            body={
            <>
                { step.id === "connect"  && <Connect /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Polygon: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("polygon", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <PolygonContext.Provider value={{ state, dispatch }}>
          <PolygontApp chain={chain} />
      </PolygonContext.Provider>
  )
}

export default Polygon
