import styled, { css } from 'styled-components';
import { animated, AnimatedValue } from 'react-spring';

interface IContainerProps {
  type: 'error' | 'success' | 'info';
  style: AnimatedValue<React.CSSProperties>;
}

const colorTypes = {
  error: css`
    background-color: #ffe2e5;
    color: #f64e60;

    svg {
      color: #f64e60;
    }
  `,
  success: css`
    background-color: #e6fffa;
    color: #2e656a;

    svg {
      color: #2e656a;
    }
  `,
  info: css`
    background-color: #eee5ff;
    color: #8950fc;

    svg {
      color: #8950fc;
    }
  `,
};

export const Container = styled(animated.div)<IContainerProps>`
  display: flex;
  align-items: center;

  z-index: 50;

  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

  ${props => colorTypes[props.type]};

  border-radius: 15px;

  padding: 10px;

  width: 360px;

  position: relative;

  & + div {
    margin-top: 8px;
  }

  > svg {
    height: 25px;
    width: 25px;
  }

  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 0 25px;

    flex: 1;

    line-height: 15px;

    > strong {
      font-size: 16px;
    }

    > p {
      font-weight: 600;
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
