$('#car_grid').empty();
$('#make_list').empty();
let makeList = new Array();
let carList = new Array();
console.log(cars);
let likeDislike = 0;
const AnimSpeed = 500;

function allCars() {
    likeDislike = 0;
    update_cars();
}

function likeCars() {
    likeDislike = 1;
    update_cars();
}

function dislikeCars() {
    likeDislike = 2;
    update_cars();
}

function get_car_obj(car) {
    return `    
    <div class="col-xl-3 col-lg-4 col-md-6 col-s-12 imgDiv" style="margin-bottom: 1rem">
        <div class="card" style="width: 100%;" >
                <div class="card" style="width: 98%; margin-left: 1%; margin-bottom: 1%; margin-top: 2%;" >
                    <img src=${car.url} class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <p>Make</p>
                            </div>
                            <div class="col-6">
                                <p class="make">${car.make}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p>Model</p>
                            </div>
                            <div class="col-6">
                                <p class="model">${car.model}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p>Year</p>
                            </div>
                            <div class="col-6">
                                <p class="year">${car.year}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p>Price</p>
                            </div>
                            <div class="col-6">
                                <p class="price">$${car.price}</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary UpVote" value="false"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button type="button" class="btn btn-secondary DownVote" value="false"><i class="fa-solid fa-thumbs-down"></i></button>
                        <button type="button" class="btn btn-danger Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
}

function get_brand_List(brand) {
    return `
        <li class="list-group-item">
            <h5>${brand}</h5>
        </li>
    `
}


cars.forEach((car) => {
    carList.push(car);
    carList.sort((a, b) => {
        return b.year - a.year
    });
});


function carAssign() {
    carList.forEach((car) => {
        $('#car_grid').append(() => {
            return get_car_obj(car);
        });
    })
}

carAssign();

function Unique(value, index, self) {
    return self.indexOf(value) === index;
}

function displayMakes() {
    $('#make_list').empty();
    makeSet = makeList.filter(Unique);
    makeSet.sort((a, b) => {
        return a.toUpperCase().localeCompare(b.toUpperCase());
    })
    for (const brand of makeSet) {
        $('#make_list').append(() => {
            return get_brand_List(brand);
        });
    }
}

$('.Delete').on('click', function (event) {
    const cardObj = $(this).parents('.imgDiv');
    cardObj.hide(AnimSpeed, function () {
        cardObj.remove();
        update_cars();
    });
});

function showOrHide(booleanVal, object, curBack) {
    if (booleanVal) {
        // console.log(title);
        const thisBack = object.find('.card-body');
        $(object).show(AnimSpeed);
        makeList.push(object.find('.make').text());
        switch (curBack) {
            case 0:
                thisBack.addClass("even_car");
                thisBack.removeClass("odd_car");
                return 1;
            case 1:
                thisBack.addClass("odd_car");
                thisBack.removeClass("even_car");
                return 0;
        }
    } else {
        $(object).hide(AnimSpeed);
        return curBack;
    }
}

function update_cars() {
    const currentSearch = $('#search_box').val().toLowerCase();
    makeList = [];
    let curBack = 0;
    $.each($('.imgDiv'), function () {
        //console.log($(this));
        const litMake = $(this).find('.make').text();
        const carName = litMake.toLowerCase();
        const carModel = $(this).find('.model').text().toLowerCase();
        const carYear = $(this).find('.year').text().toLowerCase();
        const carPrice = $(this).find('.price').text().toLowerCase();
        const hasWord = (carName.includes(currentSearch) || carModel.includes(currentSearch) || carPrice.includes(currentSearch) || carYear.includes(currentSearch));
        let outVal = hasWord;
        const upVote = $(this).find('.UpVote').val() === "true";
        const downVote = $(this).find('.DownVote').val() === "true";
        switch (likeDislike) {
            case 1:
                outVal = outVal && upVote;
                break;
            case 2:
                outVal = outVal && downVote;
                break;
        }
        curBack = showOrHide(outVal, $(this), curBack);
    })
    displayMakes();
}

$('#search_box').on('keyup', update_cars);


$("button").click(function () {
    switch (this.value) {
        case "false":
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-warning");
            this.value = "true";
            break;
        default:
            $(this).removeClass("btn-warning");
            $(this).addClass("btn-secondary");
            this.value = "false";
    }
});


update_cars();