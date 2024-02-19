

import sys
import pandas as pd
import numpy as np

# Access command-line arguments
args_from_node = sys.argv[1:]
productId=int(args_from_node[1])
#Liberary of mysql connection with python.
import mysql.connector
# create connection with mysql.
dataBase = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="shop_kro"
)
#this use for  managing database in mysql.
cursorObject = dataBase.cursor()

# selecting query
query = "SELECT * FROM PRODUCT"
# execute query.
cursorObject.execute(query)
#fetch data
myresult = cursorObject.fetchall()
list_of_product_information=[]
for x in myresult:

    list_of_product_information.append(list(x))

 

# disconnecting from server
dataBase.close()



product_df=pd.DataFrame(list_of_product_information,columns=["product_id","product_name","product_image","product_description","product_price","discount","discount_type","category_id"])


# TfindfVectorizer using nlp.
from sklearn.feature_extraction.text import TfidfVectorizer
tfv=TfidfVectorizer(min_df=3,max_features=None,strip_accents="unicode",analyzer="word",token_pattern=r'\w{1,}',ngram_range=(1,3),stop_words="english")
product_df["product_description"]=product_df["product_description"].fillna('')

#create tfv metrix.
tfv_matrix=tfv.fit_transform(product_df["product_description"])


from sklearn.metrics.pairwise import sigmoid_kernel
sig=sigmoid_kernel(tfv_matrix,tfv_matrix)

indices=pd.Series(product_df.index,index=product_df["product_id"]).drop_duplicates()


def give_rec(product_id,sig=sig):
    idx=indices[product_id]
    sig_scores=list(enumerate(sig[idx]))
    sig_scores=sorted(sig_scores,key=lambda x:x[1],reverse=True)
    sig_scores=sig_scores[1:11]
    product_indices=[i[0] for i in sig_scores]
    return product_df["product_id"].iloc[product_indices]

#predict output.
print(give_rec(productId))