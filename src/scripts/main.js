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
    //$articleCount.text('There are ' + _.random(100000, 10000000) + ' stories at your fingertips.')
    //$articleCount.text('There are ' + articles.length + ' stories at your fingertips.')
    $articleCount.text('There are ' + (articles.length * 155) + ' stories at your fingertips.')

    makeExamples()

    $('body').show(400)

    console.log('articles', articles)
 },
 simpleSheet: true } )

 function makeExamples() {
   $('.question-step button').each(function(){
     $el = $(this)
     var buttonTag = $el.attr('data-target-tags')
     $exampleLink = $el.parent().parent().find('a')
     var taggedArticles = findTaggedArticles(buttonTag)

     var exampleArticle = taggedArticles[Math.floor(Math.random()*taggedArticles.length)];

     if(exampleArticle == undefined) {
       $exampleLink.attr('href', '#')
       $exampleLink.text('')
       $el.parent().find('button').attr('disabled', 'disabled')
     }
     else {
       $exampleLink.attr('href', exampleArticle.URL)
       $exampleLink.text(exampleArticle.Title)
     }

     //console.log('exampleLink', $exampleLink)
   })
 }

$('.question-step button').on('click', function(){
  var el = $(this)
  var questionParent = el.parents('.question-step')
  var title = questionParent.find('h2').text()
  console.log('title', title)
  //var title = $('h2', questionStep).text();
  var selectedButtonText = el.text();
  var selectedTags = el.attr('data-target-tags')


  var taggedArticles = findTaggedArticles(selectedTags)
  if(taggedArticles.length !== 0) {
    articles = taggedArticles;

    // This is useful if you want to show all the questions at once
    //questionParent.find('button').attr('disabled','disabled')
    $('#tags').append(selectedTags + ' + ')
    $('#custom-sentence').append('<p>'+title + ' <strong>' + selectedButtonText.toLowerCase()+'</strong>. </p>')

    questionParent.removeClass('is-active')
    questionParent.next().addClass('is-active')

    //$('#relevant-articles').append('<code>'+JSON.stringify(articles)+'</code>')

    //////////////////////////
    // Article List Debug

    // var articleList = d3.select('#relevant-articles')
    //
    // articleList.html('')
    //
    // var articleEnter = articleList.selectAll('li')
    //   .data(articles)
    //   .enter().append('li')
    //   .html(function(d){
    //     return '<a href="' + d.URL + '">' + d.Title + '</a> <small style="color: #CCC">' + JSON.stringify(d.tags) + '</small>';
    // })
    //////////////////////////

    makeExamples()
    $articleCount.text('There are ' + taggedArticles.length + ' stories at your fingertips.')
  }
  else {
    el.attr('disabled', 'disabled')
  }
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
