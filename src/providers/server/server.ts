import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { GlobalVariable } from "../../app/global";
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';


@Injectable()
export class ServerProvider {


  isBirthdayCount: any = 0;
  reward_count: any = 0;
  punchcount: any = 0;
  appId: any = '77c7af42-a792-447b-bd4e-4d2f00346462';
  googleProjectId: any = '773485528357';
  constructor(public platform: Platform, private _notification: OneSignal, public global: GlobalVariable, public http: Http) {
    console.log('Hello ServerProvider Provider');
    // this.global.udid ='5bda5bbc';
  }
getdeals(){
  return this.http.get("http://51.254.56.71/online-ordering/index.php/customer_controller/get_deals").map(res=>res.json());
}
  LoginData(LoginData) {
    var link = this.global.BaseUrl + 'Customer_controller/login';
    var data = JSON.stringify({business_id:this.global.new_id, email: LoginData.email, password: LoginData.password });

    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  SignupData(firstname, lastname, email, password, phone, Birthday, Anniversary) {
    var link = this.global.BaseUrl + 'Customer_controller/signup';
    var data = JSON.stringify({ business_id:this.global.new_id,firstname: firstname, lastname: lastname, email: email, password: password, phone: phone, birthday: Birthday, anniversary: Anniversary });
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

  welcome_screen() {
    var link = this.global.BaseUrl + 'Customer_controller/get_welcome_screen';
    var data = JSON.stringify({ business_id: this.global.new_id});
    return this.http.post(link, data)
      .map((res: any) => res.json());

  }

  reward_notification() {
    var link = this.global.BaseUrl + 'Customer_controller/get_punch_notifications';
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

  getAddress(coordinates) {
    var link = this.global.BaseUrl + 'Customer_controller/get_address_with_coordinates';
    var data = JSON.stringify({ coordinates : coordinates });
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
    var data = JSON.stringify({ business_id: this.global.new_id ,coordinates: coordinates, radius: radius, business_type: businesType, offset, type: type, udid: this.global.udid });
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

  ForgotPassword(email) {
    var link = this.global.BaseUrl + 'Customer_controller/forgot_password';
    var data = JSON.stringify({ email: email });
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
    var link = (this.global.BaseUrl + 'menu/order_history');
    var orderdata = JSON.stringify({ udid: this.global.udid });
    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  ProductItemDetail(ItemId) {
    var link = (this.global.BaseUrl + 'menu/item_details');
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

  buy_gift_cards(token,id,udid_r,design_id,amount,message) {
    var link = (this.global.BaseUrl + 'giftcard/buy_giftcard');
    var data = JSON.stringify({udid_r:udid_r, business_id: this.global.new_id, udid_s: this.global.udid,token:token, giftcard_id:id,design_id:design_id,amount:amount,message:message});
    return this.http.post(link, data)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetBusinessMenuCategories(BusinessId) {
    var link = (this.global.BaseUrl + 'menu/categories');
    var data = JSON.stringify({ business_id: BusinessId });
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


  PaymentThroughStripe(Address, instruction, amount, order_date, Token, status) {

    var link = (this.global.BaseUrl + 'menu/place_order');
    var orderdata = JSON.stringify({ udid: this.global.udid, payment_info: { address: Address, token: Token }, order_info: this.global.Product, instruction: instruction, total: amount, scheduled_time: order_date, payment_type: status })
    console.log("stripe", orderdata, order_date);

    return this.http.post(link, orderdata)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  PaymentOnDelivery(Address, instruction, amount, order_date, Token, status) {

    var link = (this.global.BaseUrl + 'menu/place_order_cash');
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
    var data = JSON.stringify({ udid: this.global.udid, b_id: this.global.bussinessId })
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

  CheckUserReward() {
    this.isBirthdayCount = 0;
    this.reward_count = 0;

    let response = this.getUserLotteryRewards(this.global.RewardsPos);

    response.subscribe(data => {
      var user_reward = data;
      console.log("reward", user_reward);
      if (user_reward.status == 'success') {
        console.log(user_reward.rewards.length);
        user_reward.rewards.forEach(element => {
          if (element.is_birthday == 'true') {
            this.isBirthdayCount++;
          }
          else {
            this.reward_count++;
          }

        });
        console.log("this", this.reward_count, this.isBirthdayCount);
        this.global.TotalbadgeValue += this.reward_count;
        this.global.TotalbadgeValue += this.isBirthdayCount;
        this.global.RewardCount = this.reward_count;
        this.global.BirthCount = this.isBirthdayCount;

      }

    }, error => { console.log(error) });


  }

  CheckUserReward1() {
    this.isBirthdayCount = 0;
    this.reward_count = 0;

    let response = this.getUserLotteryRewards("0,0");

    response.subscribe(data => {
      var user_reward = data;
      console.log("reward", user_reward);
      if (user_reward.status == 'success') {
        console.log(user_reward.rewards.length);
        user_reward.rewards.forEach(element => {
          if (element.is_birthday == 'true') {
            this.isBirthdayCount++;
          }
          else {
            this.reward_count++;
          }

        });
        console.log("this", this.reward_count, this.isBirthdayCount);
        this.global.TotalbadgeValue += this.reward_count;
        this.global.TotalbadgeValue += this.isBirthdayCount;
        this.global.RewardCount = this.reward_count;
        this.global.BirthCount = this.isBirthdayCount;

      }

    }, error => { console.log(error) });


  }

  CheckUserPunchCards() {
    this.global.TotalbadgeValue = 0;
    this.punchcount = 0;
    let response = this.GetPunchcards(this.global.RewardsPos);

    response.subscribe(data => {
      var user_punch = data;
      console.log(user_punch);
      if (user_punch.success != "No data") {
        user_punch.cards.forEach(element => {
          // element.punch_count =10;
          if (element.punch_reward_4 != '' && element.punch_count >= 4) {

            this.punchcount++
            return;

          }
          else if (element.punch_reward_8 != '' && element.punch_count >= 8) {
            this.punchcount++
            return;
          }
          else if (element.punch_reward_10 != '' && element.punch_count >= 10) {
            this.punchcount++
            return;
          }
          else if (element.punch_reward_12 != '' && element.punch_count >= 12) {
            this.punchcount++
            return;
          }


        });
      }
      console.log(this.punchcount, "punchcount");
      this.global.punchCount = this.punchcount;
      this.global.TotalbadgeValue += this.punchcount;

    }, error => { console.log(error) });
  }
  CheckUserBadgePoints() {
    this.global.PointCount = 0;
    let res = this.getUserPoints(this.global.RewardsPos);
    res.subscribe(data => {
      console.log(data);
      if (data.status == 'success') {
        data.rewards.forEach(element => {
          if (element.reward_exist == 'true') {
            this.global.TotalbadgeValue++;
            this.global.PointCount++;
            console.log(this.global.TotalbadgeValue, "globaltotalbadge");

          }
        });

      }


    }, error => {
      console.log(error);
    })
  }


  initializePushToken() {
    console.log("intializing push token");

    if (this.platform.is('ios')) {
      var iosSettings = {};
      iosSettings["kOSSettingsKeyAutoPrompt"] = true;
      iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
      this._notification.startInit(this.appId).iOSSettings(iosSettings);
    } else if (this.platform.is('android')) {
      this._notification.startInit(this.appId, this.googleProjectId);
    }

    this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.None);
    this._notification.getIds()
      .then((ids) => {
        console.log("ids from one signal", ids);
        this.updateToken(ids.userId).toPromise()
          .then((data) => { console.log("server response on token update", data) })

      }
      ).then(
        () => {
          this._notification.setSubscription(true);
          //this.listenForNotification();
        })
      .catch(error => console.error("onesginal error", error));

    this._notification.setSubscription(true);
    this._notification.endInit();
  }

  public logResponse(res: Response | any) {
    console.log("usmn")
    console.log("server response", res);
     console.log("server response - parsed", res.json());
  }
  

}      