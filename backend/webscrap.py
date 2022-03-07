import requests
import pprint
from bs4 import BeautifulSoup
import json
import pandas as pd

urls = [
"https://results.racetimingsolutions.com/myresults.aspx?uid=16387-6232-1-726269", 
"https://results.racetimingsolutions.com/myresults.aspx?uid=16387-6232-1-726270", 
]


ptt_nba_dict = {"name": 'name',
                "gender": "gender",
                "bib": 'bib',
                "splittime1":"splittime1",
                "splittime2":"splittime1",
                "splittime3":"splittime1",
                "splittime4":"splittime1",
                "splittime5":"splittime1",
                "splittime6":"splittime1",
                "splittime7":"splittime1",
                "splittime8":"splittime1",
                "splittime9":"splittime1",
                "splittime10":"splittime1",
                "splittime11": "splittime1"
}
ptt_nba_df = pd.DataFrame(ptt_nba_dict,index=[0])

for URL in urls:
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')

    name = soup.find(id='ctl00_Content_Main_lblName')
    bib = soup.find(id='ctl00_Content_Main_lblRaceNo')

    maindata = soup.find(id='ctl00_Content_Main_divSplitGrid')
    genderdata = soup.find(id='ctl00_Content_Main_grdBio')
    if maindata is not None:

        genderdata = genderdata.find_all('tr')
        gender = genderdata[1].find_all("td")[1].text
        print(gender)


        tablerowdata = maindata.find_all('tr' )
        splittime = []
        for row in tablerowdata[1:]:
            splittime.append(row.find_all("td")[2].text)
        

        runnerstat = {"name": name.string,
                        "gender": gender,
                        "bib": bib.string,
                        "splittime1": [splittime[0]],
                        "splittime2": [splittime[1]],
                        "splittime3": [splittime[2]],
                        "splittime4": [splittime[3]],
                        "splittime5": [splittime[4]],
                        "splittime6": [splittime[5]],
                        "splittime7": [splittime[6]],
                        "splittime8": [splittime[7]],
                        "splittime9": [splittime[8]],
                        "splittime10": [splittime[9]],
                        "splittime11": [splittime[10]],
        }
        runnerstat_df = pd.DataFrame(runnerstat)
       
        ptt_nba_df = ptt_nba_df.append(runnerstat_df)
        print(ptt_nba_df)
        ptt_nba_df.to_csv('abc3.csv')


print(ptt_nba_df)