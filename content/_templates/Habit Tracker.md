```dataview  
TABLE WITHOUT ID    
file.link as Date,    
choice(Sleep > 7, "🟩", "🟥") as 🛌,   
choice(Exercise > 30, "🟩", "🟥") as 🏃,    
choice(Reading > 30, "🟩", "🟥") as 📚,    
choice(Meditation > 10, "🟩", "🟥") as 🧘,    
choice(Writing > 750, "🟩", "🟥") as ✍️  
FROM #dailies   
WHERE file.day <= date(now) AND file.day >= date(now) - dur(10days)   
SORT file.day ASC  
```