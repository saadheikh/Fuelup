class otpdata {

    card_number ;
    acc_number ;
    card_name ;
    available_blnc ;
    loyality_points ;
    limit_type;
    card_status ;
    monthly_limit

    tax_amount ;
    tax_name ;
    tax_name1 ;
    tax_day;
    tax_date;
    tax_time ;
    month_limit ;

    

     constructor(){}

            setCard_Number(cardnumber) {
                this.card_number = cardnumber;
            }

        getCard_Number(){
            return this.card_number ;
        }


        setAcc_Number(accnumber) {
            this.acc_number = accnumber;
        }

    getAcc_Number(){
        return this.acc_number ;
    }


    setCard_name(cardname) {
        this.card_name = cardname;
    }

getCard_name(){
    return this.card_name ;
}


setAvail_bln(availableblnc) {
    this.available_blnc = availableblnc;
}

getAvail_bln(){
return this.available_blnc ;
}


setAvail_bln(availableblnc) {
    this.available_blnc = availableblnc;
}

getAvail_bln(){
return this.available_blnc ;
}



setLoyality_points(loyalitypoints) {
    this.loyality_points = loyalitypoints;
}

getLoyality_points(){
return this.loyality_points ;
}


setLimit_Type(limittype) {
    this.limit_type = limittype;
}

getLimit_Type(){
return this.limit_type ;
}


setCard_Status(cardstatus) {
    this.cardstatus = cardstatus;
}

getCard_Status(){
return this.card_status ;
}


setTax_AMT(taxamount) {
    this.tax_amount = taxamount;
}

getTax_AMT(){
return this.tax_amount ;
}

setTax_Loc(taxname) {
    this.tax_name = taxname;
}

getTax_Loc(){
return this.tax_name ;
}


setTax_Date(taxdate) {
    this.tax_date = taxdate;
}

getTax_Date(){
return this.tax_date ;
}



setTax_Time(taxtime) {
    this.tax_time = taxtime;
}

getTax_Time(){
return this.tax_time ;
}

setLimit_Type(limittype) {
    this.limit_type = limittype;
}

getLimit_Type(){
return this.limit_type ;
}

setMonthly_Type(monthlylimit) {
    this.monthly_limit = monthlylimit;
}

getMonthly_Type(){
return this.monthly_limit ;
}

setTax_Name(taxname1 ) {
    this.tax_name1 = taxname1;
}

getTax_Name(){
return this.tax_name1 ;
}


mobile_numebr ;
    total_Transaction ; 
      daily_trans ;
      weekly_transaction ;
      monthly_transaction ;
      nonfuel_monthly ;
      daily_fuel;
      weekly_fuel ;
      days_allowrd ;
      token_number ;
      non_fuel_monthly ;
      daily_fuel ; 
      weekly_fuel; 
      monthly_fuel;


      setMobile_Number(mobilenumebr ) {
        this.mobile_numebr = mobilenumebr;
    }
    
    getMobile_Number(){
    return this.mobile_numebr ;
    }

    setTransaction_Limit(totalTransaction ) {
        this.total_Transaction = totalTransaction;
    }
    
    getTransaction_Limit(){
    return this.total_Transaction ;
    }


    setDaily_Trans(dailytrans ) {
        this.daily_trans = dailytrans;
    }
    
    getDaily_Trans(){
    return this.daily_trans ;
    }

    setWeely_Trans(weeklytransaction ) {
        this.weekly_transaction = weeklytransaction;
    }
    
    getWeekly_Trans(){
    return this.weekly_transaction ;
    }

    setDays_Allowed(daysallowrd ) {
        this.days_allowrd = daysallowrd;
    }
    
    getDays_Allowed(){
    return this.days_allowrd ;
    }

    setNon_Fuel(nonfuelmonthly ) {
        this.non_fuel_monthly = nonfuelmonthly;
    }
    
    getNon_Fuel(){
    return this.non_fuel_monthly ;
    }


    setDaily_Fuel(dailyfuel ) {
        this.daily_fuel = dailyfuel;
    }
    
    getDaily_Fuel(){
    return this.daily_fuel ;
    }

    setWeekly_Fuel(weekly_fuel ) {
        this.weekly_fuel = weekly_fuel;
    }
    
    getWeekly_Fuel(){
    return this.weekly_fuel ;
    }


    setMonthly_Fuel(monthly_fuel ) {
        this.monthly_fuel = monthly_fuel;
    }
    
    getMonthly_Fuel(){
    return this.monthly_fuel ;
    }





   
    
}

const userdata = new otpdata();
export default userdata ;