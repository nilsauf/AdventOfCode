increased = 0
prev = 0
mess = []
messIndex = 0

for line in open("input.txt"):
	lineValue = int(line)
	mess.append(lineValue)
	if messIndex > 0:
		mess[messIndex - 1] += lineValue
	if messIndex > 1:
		mess[messIndex - 2] += lineValue
	messIndex += 1

for messurement in mess:
	if prev > 0 and prev < messurement:
		increased += 1
	prev = messurement

print(increased)
