import numpy as np
import collections

size = 20
arr = np.random.randint(0, 62, (1,size))[0]

def mapping(x):
    if x < 10:
        return str(x)
    num = x - 10
    if num < 26:
        return chr(65 + num)
    num = num - 26
    return chr(97 + num)

def numToString(arr):
    return "".join([mapping(x) for x in arr])

def countMap(randStr):
    countMap = {}
    for x in randStr:
        if x not in countMap.keys():
            countMap[x]=0
        countMap[x]=countMap[x] + 1
    return collections.OrderedDict(sorted(countMap.items(), key= lambda x: ord(x[0])))


randomString = numToString(arr)
print(randomString)
#print(countMap(randomString))

