import pandas as pd

# Chemin d'accès au fichier CSV dans le dossier Téléchargements
fichier_csv = r'C:\Users\billy\Downloads\data_


Agglo_horaire.csv'  # Remplacez par le nom réel de votre fichier

# Lire le fichier CSV avec pandas en spécifiant le séparateur
# df = pd.read_csv(fichier_csv, sep=';')  # Utiliser sep=';' pour un fichier avec des points-virgules

# Afficher les premières lignes du fichier pour voir si tout est correct
print(df.head())  #