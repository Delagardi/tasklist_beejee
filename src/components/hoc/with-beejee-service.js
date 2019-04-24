import React from 'react';
import { ConsumerBeeJeeService } from '../context-beejee-service';

const withBeeJeeService = () => (Wrapped) => {
  return (props) => {
    return (
      <ConsumerBeeJeeService>
        {
          (beeJeeService) => {
            return (
              <Wrapped 
                {...props}
                beeJeeService={beeJeeService}
              />
            )
          }
        }
      </ConsumerBeeJeeService>
    );
  }
}

export default withBeeJeeService;