import { useReducer } from 'react';
const initialState = {
  // 'opened', 'closed'
  status: 'closed',
  balance: null,
  loan: null,
};

const DEPOSIT_AMOUNT = 150;
const WITHDRAW_AMOUNT = 50;
const LOAN_AMOUNT = 5000;

function reducer(state, action) {
  switch (action.type) {
    case 'openAccount':
      return { status: 'opened', balance: 500, loan: null };
    case 'deposit':
      return { ...state, balance: state.balance + DEPOSIT_AMOUNT };
    case 'withdraw':
      return { ...state, balance: state.balance - WITHDRAW_AMOUNT };
    case 'loan':
      return { ...state, loan: 5000, balance: state.balance + LOAN_AMOUNT };
    case 'payLoan':
      return { ...state, loan: null, balance: state.balance - LOAN_AMOUNT };
    case 'closeAccount':
      return { ...initialState };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>useReducer Hook Bank</h1>
      <p id="balance">
        Balance: {state.balance !== null ? state.balance : 'X'}
      </p>
      <p id="loan">Loan: {state.loan ? state.loan : 'X'}</p>
      <p>
        <button
          id="openAccount"
          disabled={state.status === 'opened'}
          onClick={() => dispatch({ type: 'openAccount' })}
        >
          Open Account
        </button>
      </p>
      <p>
        <button
          id="deposit"
          disabled={state.status === 'closed'}
          onClick={() => dispatch({ type: 'deposit' })}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          id="withdraw"
          disabled={
            state.status === 'closed' || state.balance < WITHDRAW_AMOUNT
          }
          onClick={() => dispatch({ type: 'withdraw' })}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          id="requestLoan"
          disabled={state.status === 'closed' || state.loan !== null}
          onClick={() => dispatch({ type: 'loan' })}
        >
          Request Loan of 5000
        </button>
      </p>
      <p>
        <button
          id="payLoan"
          disabled={
            state.status === 'closed' ||
            !state.loan ||
            state.balance < state.loan
          }
          onClick={() => dispatch({ type: 'payLoan' })}
        >
          Pay Loan
        </button>
      </p>
      <p>
        <button
          id="closeAccount"
          disabled={
            state.status === 'closed' ||
            state.balance !== 0 ||
            state.loan !== null
          }
          onClick={() => dispatch({ type: 'closeAccount' })}
        >
          Close Account
        </button>
      </p>
    </>
  );
}
