 /*script.js
    Name: Shanshan Jiang
    This is the js to calculate SEPTA Regional Rail fare prices.
    Time: 08/02/2017/ -->
    <!--There are 2 parts of the js.
    Function calculate()
    Function clear()
    */
//That fountion is used to caluculate the fare price
function calculate(){
    var zone = document.getElementById("zone").value;
    var type = document.getElementById("type").value;
    var purchase="";
    var purchasetype=document.getElementsByName("purchase");
    for (var i = 0; i < purchasetype.length; i++) {

        if (purchasetype[i].checked) {
            purchase = purchasetype[i].value;
        }
    }
    var trips = document.getElementById("trips").value;
    var fare=0;
    var zoneID = zone - 1;

    if(type==="weekday" && purchase==="advance_purchase"){
        fare=0;
    }
    else if(type==="weekday" && purchase==="onboard_purchase"){
        fare=1;
    }
    else if(type==="evening_weekend" && purchase==="advance_purchase"){
        fare=2;
    }
    else if(type==="evening_weekend" && purchase==="onboard_purchase"){
        fare=3;
    }
    else if(type==="anytime" && purchase==="advance_purchase"){
        if(trips ==="10"){
            fare=4;
        }
        else{
            fare="";
            alert("No Ticket Available For That Option");
            document.getElementById("cost").innerHTML="NA";
        }
    }
    else if(type==="anytime" && purchase==="onboard_purchase"){
        fare="";
        alert("No Ticket Available For That Option");
        document.getElementById("cost").innerHTML="NA";
    }
    else{
        fare="";
        document.getElementById("cost").innerHTML="$"+" "+ "0";
    }

    $(document).ready(function () {

        $.getJSON("fares.json",function(cost){

            $.each(cost, function (i,field) {
                if(trips ==="10" && type==="anytime" && purchase==="advance_purchase"){
                    $("#cost").html("$"+" "+cost.zones[zoneID].fares[fare].price);
                }else{
                    $("#cost").html("$"+" "+cost.zones[zoneID].fares[fare].price*trips)
                };

            });

        });

    });

}

//That fountion is used to clear the fare price
function clear(){

    document.getElementById("cost").innerHTML="NA";
}
