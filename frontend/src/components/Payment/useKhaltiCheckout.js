import KhaltiCheckout from "khalti-checkout-web";
import React from "react";

export default function useKhaltiCheckout() {
  let config = {
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a507256",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
    },
    // one can set the order of payment options and also the payment options based on the order and items in the array
    paymentPreference: [
      "MOBILE_BANKING",
      "KHALTI",
      "EBANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const checkout = () => {
    let response = new KhaltiCheckout(config);
    response.show({ amount: 1000 });
  };

  return { checkout };
}
