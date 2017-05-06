var articles;
var $firstQuestionStep = $('.question-step:first-of-type')
var $articleCount = $('#article-count')

$firstQuestionStep.addClass('is-active')

Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1B2CVh-akXsNCnyP8UK3wMIwJEAFAAQqqnWI3XSlxRME/pubhtml',
 callback: function(data, tabletop) {
     articles = data

     articles.forEach(function(article,i){
       var articleTagString = article.tags
       var articleTagArray = article.tags.split(' ')
       articles[i].tags = articleTagArray
     })
    $articleCount.text('There are ' + articles.length + ' stories at your fingertips.')
    console.log('articles', articles)
 },
 simpleSheet: true } )

$('.question-step button').on('click', function(){
  var el = $(this)
  var questionParent = el.parents('.question-step')
  var title = questionParent.find('h2').text()
  console.log('title', title)
  //var title = $('h2', questionStep).text();
  var selectedButtonText = el.text();
  var selectedTags = el.attr('data-target-tags')

  questionParent.removeClass('is-active')
  questionParent.next().addClass('is-active')


  $('#custom-sentence').append('<p>'+title + ' ' + selectedButtonText.toLowerCase()+'</p>')

  $('#tags').append(selectedTags + ' + ')

  questionParent.find('button').attr('disabled','disabled')
  var taggedArticles = findTaggedArticles(selectedTags)
  articles = taggedArticles;

  //$('#relevant-articles').append('<code>'+JSON.stringify(articles)+'</code>')

  var articleList = d3.select('#relevant-articles')

  articleList.html('')

  var articleEnter = articleList.selectAll('li')
    .data(articles)
    .enter().append('li')
    .html(function(d){
      return '<a href="' + d.URL + '">' + d.Title + '</a> <small style="color: #CCC">' + JSON.stringify(d.tags) + '</small>';
    })

  $articleCount.text('There are ' + taggedArticles.length + ' stories at your fingertips.')
})


/*
articles = [
  {
    title: "Cat Bites Dog"
    ,tags: ['2m', 'cute', 'video', 'notrump']
  }
  ,{
    title: "Trump Bites Dog"
    ,tags: ['5m', 'trump', 'article']
  }
  ,{
    title: "Watch This 24hr Cat Livestream"
    ,tags: ['60m+', 'cute', 'notrump']
  }
]
*/

function findTaggedArticles(tag) {
  var relevantArticles = []
  articles.forEach(function(article){
    var tags = article.tags
    if(_.includes(tags, tag)) {
      relevantArticles.push(article)
    }
  })
  return relevantArticles
}
