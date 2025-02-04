import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect, Balance, Call, Account, Deploy, Transfer } from '@tezos/components/steps';
import { appStateReducer, initialState, TezosContext } from '@tezos/context'
import { useAppState, useLocalStorage } from '@tezos/hooks'
import { Sidebar, Step } from '@tezos/components/layout'
import { Nav } from '@tezos/components';
import type { AppI } from '@tezos/types';

const TezosApp: React.FC<AppI> = ({ chain }) => {
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
                    { step.id === "account"  && <Account /> }
                    { step.id === "balance"  && <Balance /> }
                    { step.id === "transfer"  && <Transfer /> }
                    { step.id === "deploy"  && <Deploy /> }
                    { step.id === "call"  && <Call /> }
                </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Tezos: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("tezos", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <TezosContext.Provider value={{ state, dispatch }}>
          <TezosApp chain={chain} />
      </TezosContext.Provider>
  )
}

export default Tezos
