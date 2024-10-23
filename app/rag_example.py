from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("ribio").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("How would you explain disjoint sets to a learner who knows this biology textbook well but knows nothing about computer science? Provide specific references to the textbook.")
print(response)