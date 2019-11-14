/*
Clase que construye el modulo de ventas de un curso
*/
export class SellerModuleClass {
    constructor(
        public lp_post_id: string,
        public lp_type: string,
        public lp_room: string,
        public lp_ref: string,
        public lp_dur: string,
        public lp_price_1: string,
        public lp_price_2: string,
        public lp_price_assist_buff: string,
        public lp_currency: string,
        public lp_location: string,
        public lp_date_available: string | any,
        public lp_price_group: string,
        public lp_group_max: string,
        public lp_online?: string,
        public lp_medida?: string,
        public lp_id?: string
    ) {}
}

