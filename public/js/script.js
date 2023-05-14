$(document).ready(async function () {

    let rowContainer = $("#articles");

    let categories = $('#categories')
    await getCategories().done(function (data) {
      $.each(data, function (index, { id, nom }) {
        categories.append(`<div class="col-md-2 pt-2">
        <div class="list-group">
            <label class="list-group-item">
              <input  class="form-check-input me-1" type="checkbox" value=${id}>
              ${nom}
            </label>
        </div>
    </div>`)
      })
    }).fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus)
    })
  
  
    let categoriesList = []
    $("input[type=checkbox]").click(async function (e) {
      let categorie = e.target.value
      if (categoriesList.includes(categorie) == true) {
        console.log(categoriesList.includes(categorie) );
        categoriesList = categoriesList.filter(cat => {
          if (cat != categorie ) return true
        })
      } else {
        categoriesList.push(categorie)
      }
      console.log(categoriesList);
      await getArticles(10,0,categoriesList.toString()).done(function({articles}){
        rowContainer.html('')
        $.each(articles, function (indexes, article) {
          rowContainer.append(`<div class="col-md-4 p-3" >
          <div class="card">
              <img src="${article.image}" class="card-img-top" alt="no image">
              <div class="card-body">
                  <h5 class="card-title">${article.titre}</h5>
                  <p class="card-text">${article.contenu}.</p>
                  <a href="#" class="btn btn-primary">Read More</a>
              </div>
          </div>
      </div>`)
        })
      })
    })
  

  
    $(".page-link").click(function () {
      let skip = this.text;
  
      if (this.text == $('.page-link')[4].text) {
        skip = $('.page-link')[3].text - 1
      } else if (this.text == $('.page-link')[0].text) {
        skip = $('.page-link')[1].text - 1
      } else {
        skip = skip - 1;
      }
  
      getArticles(10, skip).done(function ({ articles, currentPage, nextPage, previousPage, hasNextPage, hasPreviousPage }) {
        rowContainer.html('')
        const pages = $('.page-link')
        parent = pages.parent();
        jQuery(pages[1]).removeClass('active');
  
        pages[2].text = currentPage
        jQuery(pages[2]).addClass('active');
  
        if (hasNextPage) {
          pages[3].text = nextPage;
          jQuery(parent.get(3)).show()
          jQuery(parent.get(4)).removeClass('disabled')
  
        } else {
          jQuery(parent.get(3)).hide()
          jQuery(parent.get(4)).addClass('disabled')
        }
  
        if (hasPreviousPage) {
          (pages[1].text = previousPage)
          jQuery(parent.get(1)).show()
          jQuery(parent.get(0)).removeClass('disabled')
  
        } else {
          jQuery(parent.get(1)).hide()
          jQuery(parent.get(0)).addClass('disabled')
  
        }
  
        $.each(articles, function (indexes, article) {
          rowContainer.append(`<div class="col-md-4 p-3" >
          <div class="card">
              <img src="${article.image}" class="card-img-top" alt="no image">
              <div class="card-body">
                  <h5 class="card-title">${article.titre}</h5>
                  <p class="card-text">${article.contenu}.</p>
                  <a href="#" class="btn btn-primary">Read More</a>
              </div>
          </div>
      </div>`)
        })
      })
    })
  
  
    getArticles(10, 0).done(function ({ articles, currentPage, nextPage, previousPage, lastPage }) {
  
      $.each(articles, function (indexes, article) {
        rowContainer.append(`<div class="col-md-4 p-3">
        <div class="card">
            <img src="${article.image}" class="card-img-top" alt="no image">
            <div class="card-body">
                <h5 class="card-title">${article.titre}</h5>
                <p class="card-text">${article.contenu}.</p>
                <a href="#" class="btn btn-primary">Read More</a>
            </div>
        </div>
    </div>`)
      })
  
    }).fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus)
    })
  })
  
  
  function getArticles(take = 10, skip = 0, categoriesId = '' ) {
    
    return $.ajax({
      url: `http://localhost:3000/articles?limit=${take}&page=${skip + 1}&categories=${categoriesId}`,
      method: "GET",
      dataType: "json",
    })
  }
  
  function getCategories() {
    return $.ajax({
      url: `http://localhost:3000/categories`,
      method: "GET",
      dataType: "json",
    })
  }

  function getArticles(take = 10, skip = 0 ) {
  
    return $.ajax({
      url: `http://localhost:3000/articles?limit=${take}&page=${skip + 1}`,
      method: "GET",
      dataType: "json",
    })
  }

  getArticles(10, 0).done(function ({ articles }) {

    $.each(articles, function (indexes, article) {
    })

  }).fail(function (jqXHR, textStatus) {
    alert("Request failed: " + textStatus)
  })
