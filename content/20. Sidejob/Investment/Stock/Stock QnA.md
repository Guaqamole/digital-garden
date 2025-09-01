## Basics
### 주가가 투자지표와 다르게 움직인다?
다른 많은 변수들이 작용하기 때문. 하지만 실전에서는 설령 정석대로 두지 않더라도 정석을 모르면 결코 바둑 고수가 될 수 없다.


## Intermediate
### How to research and analyze stock

#### General
1. Understand the company and its industry: Start by researching the company's business model, industry, competitors, and market trends. Look at their financial statements, earnings reports, and other relevant data to gain a better understanding of their performance and growth potential.
2. Analyze the company's financials: Look at the company's financial statements, including their balance sheet, income statement, and cash flow statement. Pay attention to important metrics such as revenue growth, profitability, debt levels, and cash flow. This can help you assess the financial health of the company and its ability to generate returns for shareholders.
3. Assess the company's management and leadership: Look at the company's leadership team, board of directors, and other key executives. Consider their experience, track record, and reputation. This can help you assess the company's ability to execute its business strategy and create value for shareholders.
4. Analyze the stock's valuation: Look at the company's current stock price, price-to-earnings ratio, price-to-book ratio, and other valuation metrics. Compare these metrics to those of the company's competitors and historical averages. This can help you determine if the stock is undervalued or overvalued.
5. Consider the company's future prospects: Look at the company's growth prospects, including new products or services, expansion plans, and other factors that could drive future growth. This can help you assess the company's long-term potential and whether the stock is a good investment.
6. Consider risks and challenges: Look at the company's risks and challenges, including industry trends, competition, regulatory changes, and other factors that could impact the company's performance. This can help you assess the potential downside risks of investing in the stock.
7. Diversify your portfolio: Consider diversifying your portfolio by investing in stocks from different industries and sectors. This can help you reduce your risk and potentially improve your returns over the long-term.
#### 2-way approach
I have two steps in approach for stock finding. 
- The first aspect is the general appearance, this is often done based on guts and feels.
- The second aspect is looking the company finance.

Example of first approach. A tsunami hit the coast of island XY and the stock of the insurance goes down 8% due to negative media and people knowing the company will have to pay a lot. Well, go and buy some of that stock right after the crash, the next season is coming for sure and the insurance will increase their rates and thus increase their margin for the next two years, and you will be part of it.

The second approach, I take every time! is to look at the companies finances. There are a few key finance elements you should look at to rate the company. The profit, the turnover, the **number** of investments done, the stock price and price-earnings ratio PER. This should be taken for at least the last 4 years, to get a good comparison. To get these values you will need the annual reports of your company. (I wrote myself an application that does this for me). Let me show you below how this should look like with T12-T16 for turnover and P12-P16 for profit.

![](https://i.imgur.com/j3y90qD.png)

Next step is fairly simple: you look at the stock prices compared to the development of financial numbers. Has the profit gone up by 20% every year, but the stock price stagnated? That is a very good sign that the company is underrated. Same goes vice versa and for the turnover. This in Excel can be calculated using a regression for both the turnover and profit, and applying this regression to the starting stock price.

Example: the turnover increases linearly by the factor 1,14 and the profit by 1,12. Average being 1,13 (this can be done this way or advance the algorithm if you like), this factor needs to be applied to the starting stock price. We started with the calculation in the year 2012. The stock price was $45 and should today be $45*1.13=$50.85. Is the price below $50, good to buy, higher than $52, you should avoid it, as it seems to be overpriced.

This result calculation then looks like this, with the rating being better the higher (equal to potential).
![](https://i.imgur.com/rc8Fulq.png)

Using this technique, I chose the top 10 stock and managed to drive in 39,2%p.a., with recalculating the above table and adapting the portfolio.

My number 1 rule for investing in stock!

DO NOT BUY BASED ON MEDIA, BUY BASED ON THE FACTS

One simple last tip I give everyone: by the time a bank says “you have to buy XY, they are about to explode” - they already bought in! So why would they tell you this secret?! Reason 1 is: they want to temporarily push the stock price with you buying in, to then sell at a better price - or they want to get your trust - but also increase the stock price again. There is no such thing as a free lunch!

**“소문에 사고, 뉴스에 팔라!”**