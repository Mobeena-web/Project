import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { GlobalVariable } from "../../app/global";
// import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import {CONFIG} from '../../../app-config';


@Injectable()
export class ServerProvider {


  isBirthdayCount: any = 0;
  reward_count: any = 0;
  punchcount: any = 0;
  appId: any = CONFIG.appId;
  googleProjectId: any = CONFIG.googleProjectId;
  constructor(public platform: Platform,
    // private _notification: OneSignal,
    public global: GlobalVariable, public http: Http) {
    console.log('Hello ServerProvider Provider');
    // this.global.udid ='5bda5bbc';
  }
getdeals(){
  return this.http.get("http://51.254.56.71/online-ordering/index.php/customer_controller/get_deals").map(res=>res.json());
}
  LoginData(LoginData) {
    var link = this.global.BaseUrl + 'Customer_controller/login';
    var data = JSON.stringify({business_id:this.global.new_id, email: LoginData.email, phone: LoginData.code + LoginData.phone, password: LoginData.password });

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  SendLogindataToServer(username,password) {

    var data = JSON.stringify({ username: username, password: password });
    var link = this.global.BaseUrl + 'Business_controller/app_login';

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  SignupData(firstname, lastname, email, password, phone, Birthday, Anniversary,profile_complete) {
    var link = this.global.BaseUrl + 'Customer_controller/signup';
    var data = JSON.stringify({profile_complete:profile_complete,business_id:this.global.new_id,firstname: firstname, lastname: lastname, email: email, password: password, phone: phone, birthday: Birthday, anniversary: Anniversary });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  LoadBannersOnHomePage() {
    var link = this.global.BaseUrl + 'Customer_controller/get_banners';
    var data = JSON.stringify({udid: this.global.udid, business_id: this.global.new_id,app_version: this.global.app_version });
    return this.http.post(link, data)
      .map((res: any) => res.json());
   
  }

  check_user_by_phone(phone){
    var link = this.global.BaseUrl + 'Customer_controller/search_customer_with_phone';
    var data = JSON.stringify({ business_id: this.global.new_id,phone:phone });
    return this.http.post(link, data)
      .map((res: any) => res.json());
  }

  welcome_screen() {
    var link = this.global.BaseUrl + 'Customer_controller/get_welcome_screen';
    var data = JSON.stringify({ business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json());

  }

  reward_notification() {
    var link = this.global.BaseUrl + 'Customer_controller/get_welcome_modal';
    var data = JSON.stringify({business_id: this.global.new_id,udid: this.global.udid });
   
    return this.http.post(link,data)
      .map((res: any) => res.json())
  }

  GetPunchcards(coordinates) {

    var link = this.global.BaseUrl + 'Customer_controller/get_punchcards';
    var data = JSON.stringify({ udid: this.global.udid , coordinates :coordinates,business_username:this.global.business_username });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAddress(coordinates, branchId = false) {
    var link = this.global.BaseUrl + 'Customer_controller/get_address_with_coordinates';
    var data = JSON.stringify({ business_id: this.global.bussinessId,coordinates : coordinates });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  get_events() {

    var link = this.global.BaseUrl + 'events/get_events';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ businessId: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_about_us(id) {

    var link = this.global.BaseUrl + 'events/get_aboutus';

    var data = JSON.stringify({ business_id:id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_services() {

    var link = this.global.BaseUrl + 'salon/get_services';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_stylist(service_id) {

    var link = this.global.BaseUrl + 'salon/get_stylist';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ business_id: this.global.new_id,service_id : service_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_slots(service_id,stylist_id,scedule_time) {
    var link = this.global.BaseUrl + 'salon/get_stylist_timing';
    console.log("Time: ",scedule_time)
    var data = JSON.stringify({ business_id: this.global.new_id,service_id : service_id,stylist_id:stylist_id,schedule_time:scedule_time});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  booking_salon(service_id,stylist_id,time_slot) {

    var link = this.global.BaseUrl + 'salon/booking';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ udid:this.global.udid,business_id: this.global.new_id,service_id : service_id,stylist_id:stylist_id,time_slot:time_slot});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  booking_history() {
    var link = this.global.BaseUrl + 'salon/booking_history';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ udid:this.global.udid,business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  booking_cancel(bookingId) {
    var link = this.global.BaseUrl + 'salon/cancel_booking';
    console.log(this.global.bussinessId)
    var data = JSON.stringify({ id: bookingId, business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_offers() {
    var link = this.global.BaseUrl + 'events/get_offers';

    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_business_reward() {
    var link = this.global.BaseUrl + 'rewards/get_business_rewards';
    
    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  redeem_point_reward(reward_id){
    var link = this.global.BaseUrl + 'rewards/buy_reward';
    
    var data = JSON.stringify({ business_id: this.global.new_id,udid:this.global.udid,reward_id:reward_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  redeem_point_menu_reward(reward_id,reward_type ){
    var link = this.global.BaseUrl + 'rewards/get_redeem_points';
    
    var data = JSON.stringify({ business_id: this.global.new_id,udid:this.global.udid,item_id:reward_id,reward_type:reward_type });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPoints(coordinates) {

    var link = this.global.BaseUrl + 'Customer_controller/get_points';
    var data = JSON.stringify({ business_username:this.global.business_username,udid: this.global.udid , coordinates :coordinates });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPunch(coordinates) {

    var link = this.global.BaseUrl + 'Customer_controller/get_punchcards';
    var data = JSON.stringify({ business_username:this.global.business_username,udid: this.global.udid , coordinates :coordinates });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserLotteryRewards(coordinates) {
    var link = this.global.BaseUrl + 'Customer_controller/get_rewards';
    var data = JSON.stringify({ udid: this.global.udid , coordinates :coordinates });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserLotteryRewards_new() {
    var link = this.global.BaseUrl + 'Customer_controller/get_rewards_new';
    var data = JSON.stringify({ business_id:this.global.new_id,udid: this.global.udid });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  get_all_Rewards_new() {
    var link = this.global.BaseUrl + 'rewards/get_customer_rewards';
    var data = JSON.stringify({ business_id:this.global.new_id,udid: this.global.udid });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  SendQRcodeToServer(barcodeData) {
    var link = this.global.BaseUrl + 'Customer_controller/scanqr';
    var request = JSON.stringify({ udid: this.global.udid, businessname: barcodeData });
    return this.http.post(link, request)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRestaurantslist(radius, businesType, coordinates, offset, type) {
    var link = this.global.BaseUrl + 'Customer_controller/getplaces';
    var data;
    if(this.global.marketPlace){
       data = JSON.stringify({coordinates: coordinates,business_type: 'marketPlace', radius: radius, offset });

    }
    // else if(this.global.new_id == '76'){
    //   data = JSON.stringify({coordinates: coordinates, radius: radius, business_type: businesType, offset, type: type, udid: this.global.udid });
      
    // }
    else{
      data = JSON.stringify({ business_id: this.global.new_id ,coordinates: coordinates, radius: radius, business_type: businesType, offset, type: type, udid: this.global.udid });

    }
    return this.http.post(link, data)
      .map((res: any) => res.json());
  }

  BusinessInformation(placeName) {
    var link = this.global.BaseUrl + 'Customer_controller/getbusinessinfo';
    var data = JSON.stringify({ business_username: placeName });
  return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getUserProfileData() {
    var link = this.global.BaseUrl + "Customer_controller/get_profile_data";
    var data = JSON.stringify({business_id:this.global.new_id, udid: this.global.udid });

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  UpdateUserProfile(firstname, user_email, lastname, password, phone, user_birthday, user_aniversary) {

    var link = this.global.BaseUrl + 'Customer_controller/update_profile';
    var data = JSON.stringify({ business_id:this.global.new_id,firstname: firstname, email: user_email, lastname: lastname, password: password, phone: phone, birthday: user_birthday, anniversary: user_aniversary });
    console.log("data", data);
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  ForgotPassword(c_data) {
    var link = this.global.BaseUrl + 'Customer_controller/forgot_password';
    if(c_data.phone){
      var data = JSON.stringify({ business_id:this.global.new_id,phone:c_data.code + c_data.phone });

    }
    else{
      var data = JSON.stringify({ business_id:this.global.new_id,email: c_data.email});

    }
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_social() {
    var link = this.global.BaseUrl + 'events/get_socials';
    var data = JSON.stringify({ businessId:this.global.new_id, });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  date_convert(date) {
    var link = this.global.BaseUrl + '/menu/get_date_convert';
    var data = JSON.stringify({ date:date });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  MobileVerification() {
    var link = this.global.BaseUrl + "Customer_controller/send_verification_message";

    var data = JSON.stringify({business_id:this.global.new_id, email: this.global.Email, phone:this.global.PhoneNo });
    console.log("mobileVerify",data)
    return this.http.post(link, data)
      .do(this.logResponse)
      .map((res: any) => res.json())
      
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }




  SendVerificationCodeToServer(phoneCode) {
    var link = this.global.BaseUrl + "Customer_controller/check_verification_code";
    var data = JSON.stringify({business_id:this.global.new_id, email: this.global.Email, phone_code :phoneCode});
    console.log("verifuy",data)
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  LotteryRedeeem(StorePoint, special_flag) {
    var link = this.global.BaseUrl + 'business_controller/app_lottery_redeem_orders';
    var data = JSON.stringify({ username: this.global.BusinessID, qr_code: this.global.udid, amount: StorePoint, is_special: special_flag });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  AddUserReview(user_email, ReviewData, index1, bussiness) {
    var link = this.global.BaseUrl + 'Customer_controller/review';
    var request = JSON.stringify({ useremail: user_email, title: '', description: ReviewData.description, rating: index1, business: bussiness });
    return this.http.post(link, request)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  //////////  WALLET API'S /////////// 

  GetWalletCategories() {
    var link = this.global.BaseUrl + "Customer_controller/get_wallet_categories";
    return this.http.get(link)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  SendWalletDataToServer(walletdata, category, frontImage, backImage) {
    var link = this.global.BaseUrl + 'Customer_controller/wallet_add';
    var data = JSON.stringify({ udid: this.global.udid, name: walletdata.cardName, expiration: walletdata.expDate, notes: walletdata.notes, category: category, front: frontImage, back: backImage })
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  GetUserWalletList() {
    var link = this.global.BaseUrl + "Customer_controller/get_wallet";
    var data = JSON.stringify({ udid: this.global.udid });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  DeleteUserWallet(WalletId) {

    var link = this.global.BaseUrl + "Customer_controller/wallet_delete";
    var data = JSON.stringify({ wallet_id: WalletId });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //////  Order API'S ///////

  GetUserOrderPlaced() {
    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/order_history');

    }
    else{
      var link = (this.global.BaseUrl + 'menu/order_history');      
    }
    var orderdata = JSON.stringify({ udid: this.global.udid });
    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  ProductItemDetail(ItemId) {
    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/item_details');
    }
    else{
      var link = (this.global.BaseUrl + 'menu/item_details');
    }
    
    var data = JSON.stringify({ item_id: ItemId });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  gallery_list() {
    var link = (this.global.BaseUrl + 'events/get_gallery_list');
    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  gift_cards() {
    var link = (this.global.BaseUrl + 'giftcard/get_business_giftcards');
    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  my_gift_cards() {
    var link = (this.global.BaseUrl + 'giftcard/get_customer_giftcards');
    var data = JSON.stringify({ business_id: this.global.new_id , udid: this.global.udid});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  my_gift_cards_design() {
    var link = (this.global.BaseUrl + 'giftcard/get_giftcard_designs');
    var data = JSON.stringify({ business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  search_user(email) {
    var link = (this.global.BaseUrl + 'giftcard/search_user');
    var data = JSON.stringify({ business_id: this.global.new_id , email: email});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  craete_user(email,fname,lname) {
    var link = (this.global.BaseUrl + 'giftcard/create_user');
    var data = JSON.stringify({ business_id: this.global.new_id , email: email, first_name:fname, last_name:lname});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  buy_gift_cards(token,id,udid_r,design_id,amount,message,action,cardinfo?) {
    var link = (this.global.BaseUrl + 'giftcard/buy_giftcard');
    var data = JSON.stringify({udid_r:udid_r, business_id: this.global.new_id, udid_s: this.global.udid,token:token, giftcard_id:id,design_id:design_id,amount:amount,message:message,action:action,card_info:cardinfo});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetBusinessMenuCategories(BusinessId) {
    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/categories');
    }
    else{
      var link = (this.global.BaseUrl + 'menu/categories');
    }
    var data = JSON.stringify({ business_id: BusinessId ,platform:'app'});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetSuperCategories(BusinessId, super_id) {
    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/categories');
    }
    else{
      var link = (this.global.BaseUrl + 'menu/categories');
    }
    var data = JSON.stringify({ business_id: BusinessId ,platform:'app', super_category_id: super_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getpoints_menuitems() {
    var link = (this.global.BaseUrl + 'rewards/get_point_rewards');
    var data = JSON.stringify({ business_id: this.global.new_id });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getrewards_menuitems() {
    var link = (this.global.BaseUrl + 'rewards/get_reward_list');
    var data = JSON.stringify({ business_id: this.global.new_id ,udid:this.global.udid});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getpunches_menuitems() {
    var link = (this.global.BaseUrl + 'rewards/get_punches_rewards');
    var data = JSON.stringify({ business_id: this.global.new_id ,udid:this.global.udid});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


  OrderStatusThroughPaypal(Address, instruction, myDate, cashpay) {
    var link = this.global.BaseUrl + 'menu/place_order_pp';
    var data = JSON.stringify({ udid: this.global.udid, payment_info: Address, order_info: this.global.Product, instruction: instruction, scheduled_time: myDate, total: cashpay, payment_type: "Paypal" })
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  OrderConfirmationThroughPaypal(orderStatus, orderId) {
    var link = this.global.BaseUrl + 'menu/status_order_pp';
    var data = JSON.stringify({ status: orderStatus, order_id: orderId });
    console.log("oderstatusdata", data);
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  PaymentThroughStripe(Address, instruction, amount, order_date, Token, status,cash_discount,cardinfo?) {

    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/place_order');

    }
    else{
      var link = (this.global.BaseUrl + 'menu/place_order');

    }

    var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { cash_discount:cash_discount,address: Address, token: Token,cardInfo:cardinfo,admin_stripe_enabled:this.global.admin_stripe_enabled,authorize_enabled:this.global.authorize_enabled }, order_info: this.global.Product, instruction: instruction, total: amount, scheduled_time: order_date, payment_type: status })
    console.log("stripe", orderdata, order_date);

    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  PaymentOnDelivery(Address, instruction, amount, order_date, Token, status) {

    if(this.global.business_type == 'retail'){
      var link = (this.global.BaseUrl + 'retail/place_order_cash');

    }
    else{
      var link = (this.global.BaseUrl + 'menu/place_order_cash');

    }
    var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { address: Address, token: Token }, order_info: this.global.Product, instructions: instruction, total: amount, scheduled_time: order_date, payment_type: status })
    console.log("stripe", orderdata, order_date);

    return this.http.post(link, orderdata)
    .do(this.logResponse)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //// points system///////
  getUserPoints(coordinates) {
    var link = this.global.BaseUrl + 'Customer_controller/get_points';
    var data = JSON.stringify({ udid: this.global.udid, coordinates : coordinates,business_username:this.global.business_username });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  MobileVericationCheck() {
    var link = this.global.BaseUrl + 'Customer_controller/mobile_verification';
    var data = JSON.stringify({ udid: this.global.udid });
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  OrderStatusThroughCashOnDelivery(ProcessData, instruction, myDate, cashpay) {
    var link = this.global.BaseUrl + 'menu/place_order_pp';
    var data = JSON.stringify({ udid: this.global.udid, payment_info: ProcessData.Address + "," + ProcessData.city + "," + ProcessData.state + "," + ProcessData.zipcode, order_info: this.global.Product, instruction: instruction, scheduled_time: myDate, total: cashpay, payment_type: "Paypal" })
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  LiveSearch(ch, coordinates, radius, businesType) {
    var link = this.global.BaseUrl + 'Customer_controller/live_search';
    var data = JSON.stringify({ keyword: ch, coordinates: coordinates, radius: radius, business_type: businesType })
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  CheckUserPoints() {
    var link = this.global.BaseUrl + 'Customer_controller/check_points';
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.new_id })
    console.log("points sending data", data);

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  RedeemUserPoints() {
    var link = this.global.BaseUrl + 'Customer_controller/redeem_points';
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, amount: this.global.points_availed })
    console.log("redeem points", data);

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  ReservationChecking(people, time) {
    var link = this.global.BaseUrl + 'Customer_controller/reservation_status';
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, persons: people, time: time })
    console.log(data);

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  AddReservation(people, time, notes) {
    var link = this.global.BaseUrl + 'Customer_controller/add_reservation';
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, persons: people, time: time, notes: notes })
    console.log(data);

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getReservations() {
    var link = this.global.BaseUrl + 'Customer_controller/get_reservations';
    var data = JSON.stringify({ udid: this.global.udid })
    console.log(data);

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  PaymentThroughPayOnVenue(instruction, amount) {

    var link = (this.global.BaseUrl + 'menu/place_order_r');
    var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: '', order_info: this.global.Product, instruction: instruction, total: amount, payment_type: 'Pay_on_venue', reservation_id: this.global.reservation_id })
    console.log(orderdata);

    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  PaymentThroughStripeReservation(instruction, amount, Token) {

    var link = (this.global.BaseUrl + 'menu/place_order_r');
    var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { address: '', token: Token }, order_info: this.global.Product, instruction: instruction, total: amount, payment_type: 'Stripe', reservation_id: this.global.reservation_id })
    console.log(orderdata);

    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  OrderStatusThroughPaypalReservation(instruction, cashpay) {
    var link = this.global.BaseUrl + 'menu/place_order_pp_r';
    var data = JSON.stringify({ udid: this.global.udid, payment_info: '', order_info: this.global.Product, instruction: instruction, total: cashpay, payment_type: "Paypal", reservation_id: this.global.reservation_id })
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  OrderConfirmationThroughPaypalReservation(orderStatus, orderId) {
    var link = this.global.BaseUrl + 'menu/status_order_pp_r';
    var data = JSON.stringify({ status: orderStatus, order_id: orderId });
    console.log("oderstatusdata", data);
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  userBusinessAvailedDiscount() {
    var link = this.global.BaseUrl + 'Customer_controller/customer_discount';
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId, discount_count: this.global.availed_discount_count });
    console.log("oderstatusdata", data);
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateToken(id) {
    var link = this.global.BaseUrl + 'Customer_controller/customer_player_id';
    var data = JSON.stringify({ udid: this.global.udid, player_id: id });
    console.log("update", data);
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  business_login(username,password){
    var data = JSON.stringify({ username: username, password: password });
    var link = this.global.BaseUrl + 'business_controller/app_login';

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  special_offer_banners() {
    var link = this.global.BaseUrl + 'business_controller/get_special_offer_banners';
    var data = JSON.stringify({ business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  // initializePushToken() {
  //   console.log("intializing push token");

  //   if (this.platform.is('ios')) {
  //     var iosSettings = {};
  //     iosSettings["kOSSettingsKeyAutoPrompt"] = true;
  //     iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
  //     this._notification.startInit(this.appId).iOSSettings(iosSettings);
  //   } else if (this.platform.is('android')) {
  //     this._notification.startInit(this.appId, this.googleProjectId);
  //   }

  //   this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.None);
  //   this._notification.getIds()
  //     .then((ids) => {
  //       console.log("ids from one signal", ids);
  //       this.updateToken(ids.userId).toPromise()
  //         .then((data) => { console.log("server response on token update", data) })

  //     }
  //     ).then(
  //       () => {
  //         this._notification.setSubscription(true);
  //         //this.listenForNotification();
  //       })
  //     .catch(error => console.error("onesginal error", error));

  //   this._notification.setSubscription(true);
  //   this._notification.endInit();
  // }

  public logResponse(res: Response | any) {
    console.log("usmn")
    console.log("server response", res);
     console.log("server response - parsed", res.json());
  }

  
  

}      