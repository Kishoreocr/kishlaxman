export class AppConstants {
    public static get loginURL(): string { return "/loginform"; }

    public static get packageURL(): string { return "/package-choose"; }

    public static get userdashboardURL(): string { return "/userdashboard"; }

    public static get AdminloginURL(): string { return "/admindashboard"; }

    public static get AgentloginURL(): string { return "/agentdashboard" }

    public static get paymentKey(): string { return "8IJWsyEj"; }

    public static get paymentSalt(): string { return "7e9GXyMM0H"; }

    public static get paymentServiceProvider(): string { return "payu_paisa"; }

        //DEV
    //public static get paymentActionurl(): string { return "https://sandboxsecure.payu.in/_payment"; }
    //public static get paymentSurl(): string { return "http://202.153.46.90:8080/egaze-api/payment/payment-response"; }
    //public static get paymentFurl(): string { return "http://202.153.46.90:8080/egaze-api/payment/payment-response"; }

    //PROD
    public static get paymentActionurl(): string { return "https://secure.payu.in/_payment";}
    public static get paymentSurl(): string { return "https://egaze.in/egaze-api/payment/payment-response"; }
    public static get paymentFurl(): string { return "https://egaze.in/egaze-api/payment/payment-response"; }

}
