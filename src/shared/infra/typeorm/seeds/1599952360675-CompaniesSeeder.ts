/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner } from 'typeorm';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface ICompany {
  name: string;
  symbol: string;
  image: string;
  description: string;
}

export default class CompaniesSeeder1599952360675
  implements MigrationInterface {
  companies: ICompany[] = [
    {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      image: 'apple.png',
      description: `With a market capitalization of $868.8 billion, Apple Inc. (NASDAQ:AAPL) has made for one of the greatest investing stories in history. And not once, but twice. Founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976, the early success of its Apple I, Apple II, and Macintosh computers made it a huge financial success for anyone who invested in the company after its 1980 IPO. But a number of challenges and a power struggle led to the departure of Jobs in 1985.`,
    },
    {
      name: 'Alphabet Inc.',
      symbol: 'GOOG',
      image: 'google.png',
      description: `The parent company of Google, Alphabet (NASDAQ:GOOG)(NASDAQ:GOOGL), is worth $720.8 billion. But unlike Apple, which makes a living selling high-end tech devices, Alphabet doesn't charge its users much or anything at all for most of its services. YouTube, Google search, Gmail, Google Drive cloud storage, and Documents productivity software are all free at their basic levels, while some premium services -- like additional storage and ad-free content on YouTube -- are available for a modest fee.`,
    },
    {
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      image: 'microsoft.png',
      description: `Microsoft Corporation (NASDAQ:MSFT) played a big role in the advent of affordable personal computing. But while Apple developed a fully integrated software and hardware system, Microsoft is all about software. It also was a big reason why Apple lost the home PC wars in the late 1980s, while Microsoft, with its "Wintel" duopoly with Intel Corporation (NASDAQ:INTC) (which is also on this list) went on to command virtually the entire personal computer market for decades.`,
    },
    {
      name: 'Amazon',
      symbol: 'AMZN',
      image: 'amazon.png',
      description: `Amazon.com, Inc. (NASDAQ:AMZN) is one of few companies to emerge from the late 1990s tech bubble a success. And with a market cap of $560 billion, it easily qualifies as the biggest. Started by Jeff Bezos as an online bookstore, Amazon sells just about everything today, and tens of millions of people subscribe to its Prime membership program for free shipping, free TV, and free movie streaming. Prime members count on Amazon as their first -- and often only -- stop for online shopping. The company's sales are growing strongly: Last quarter alone, revenue was up 34% to $44 billion. `,
    },
    {
      name: 'Facebook Inc.',
      symbol: 'FB',
      image: 'facebook.png',
      description: `The dominant social media platform, Facebook Inc. (NASDAQ:FB), is worth $508.9 billion. Founded by CEO Mark Zuckerberg and several other Harvard students in 2004, it was initially available only to fellow Harvard classmates and then a few other colleges.`,
    },
    {
      name: 'Visa Inc.',
      symbol: 'V',
      image: 'visa.png',
      description: `It may surprise you to know that electronic payments network giant Visa Inc. (NYSE:V), with a market cap of $249.8 billion, has only been a public company for about 10 years. Started in 1958 as part of Bank of America and called BankAmericard, it would not become a separate company until 1970, and even then, it was largely under the control of the many banks that issued BankAmericards.`,
    },
    {
      name: 'Alibaba Group',
      symbol: 'BABA',
      image: 'alibaba.png',
      description: `Founded by executive chairman Jack Ma in 1999, Alibaba Group Holding Ltd (NYSE:BABA) started out connecting Chinese manufacturers to international buyers. Today, Alibaba Group is a lot more than that, having grown to become the e-commerce giant in China, with nearly 500 million active users over the past four quarters. Sales were up 61% last quarter, and the company expects revenue to increase as much as 53% for the full year.`,
    },
    {
      name: 'Johnson & Johnson',
      symbol: 'JNJ',
      image: 'johnson.png',
      description: `More than 130 years after its founding, Johnson & Johnson (NYSE:JNJ) is still one of the biggest innovators in the healthcare industry, as reflected by its $375 million market value. Best-known for consumer brands including Band-Aid and Tylenol, the healthcare giant is also a major medical device and pharmaceutical manufacturer. Last quarter, its pharmaceutical segment generated almost half of sales, while medical devices were worth twice as much revenue as the consumer-goods segment. `,
    },
    {
      name: 'JPMorgan Chase & Co.',
      symbol: 'JPM',
      image: 'jpmorgan.png',
      description: `JPMorgan Chase & Co. (NYSE:JPM) has its roots as far back as 1799, with the founding of one of its predecessors, the Bank of the Manhattan Company. After dozens of acquisitions and mergers in the many years since, today's JPMorgan Chase is America's biggest bank, and one of the world's largest by total assets. It's worth $360 million at recent share prices.`,
    },
    {
      name: 'ExxonMobil',
      symbol: 'XOM',
      image: 'exxonmobil.png',
      description: `With a market cap of $348.6 billion, ExxonMobil Corporation (NYSE:XOM) is similar to JPMorgan Chase in that it's a product of numerous acquisitions and mergers over the years. It also has its roots in the early days of the American oil industry, directly descended from multiple companies that were part of John D. Rockefeller's Standard Oil.`,
    },
    {
      name: 'Bank of America',
      symbol: 'BAC',
      image: 'backofamerica.png',
      description: `With a market cap of $295.7 billion, Bank of America Corp. (NYSE:BAC) is second to JPMorgan Chase among the most valuable U.S. banks. It's also the nation's second-biggest bank by assets as well. `,
    },
    {
      name: 'Wal-Mart Stores Inc.',
      symbol: 'WMT',
      image: 'walmart.png',
      description: `Even as e-commerce becomes a bigger and bigger piece of the pie, brick-and-mortar behemoth Wal-Mart Stores Inc. (NYSE:WMT) remains a retail giant, with a market cap of $289.8 billion. Founded by Sam Walton in the early 1960s, Wal-Mart now operates more than 11,600 stores, it sold $486 billion in merchandise last year, and it employs 2.3 million people around the world. `,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const company of this.companies) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Company)
        .values({
          name: company.name,
          symbol: company.symbol,
          image: company.image,
          description: company.description,
        })
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const company of this.companies) {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Company)
        .where('symbol = :symbol', { symbol: company.symbol })
        .execute();
    }
  }
}
