using AdventOfCode_2023.Day_4;

Console.WriteLine("Advent Of Code 2023 - Day 4");
Console.WriteLine();

int result1 = Data.Input.Split('\n')
	.Select(GetPointsOfCard)
	.Sum();

int GetPointsOfCard(string card)
{
	var cardData = GetCardData(card);

	return cardData[1].Aggregate(0, (result, next) => cardData[0].Contains(next) == false ?
		result :
		result == 0 ?
			1 :
			result * 2);
}
List<List<int>> GetCardData(string card) => card.Split(':')
	.Last()
	.Split('|')
	.Select(numbers => Data.Numbers.Matches(numbers))
	.Select(matches => matches
		.Select(match => int.Parse(match.Value))
		.ToList())
	.ToList();

Console.WriteLine($"Result #1: {result1}");

/// ---------------------------------------------------------------------- ///

List<int> cardCopyNumbers = [];

string[] lines = Data.Input.Split('\n');

foreach (string line in lines)
{
	cardCopyNumbers.AddRange(ProcessCard(line));
}

int result2 = lines.Length + cardCopyNumbers.Count;

IEnumerable<int> ProcessCard(string card)
{
	int cardNumber = int.Parse(Data.Numbers.Match(card.Split(':').First()).Value);

	var cardData = GetCardData(card);
	var winningCount = cardData[1].Aggregate(0,
		(result, next) => cardData[0].Contains(next) == false ?
			result :
			result + 1);

	return (winningCount > 1 ?
		Enumerable.Range(cardNumber + 1, winningCount) :
		winningCount == 1 ?
			Enumerable.Repeat(cardNumber + 1, 1) :
			Enumerable.Empty<int>())
		.SelectMany(copyNumber => Enumerable.Repeat(copyNumber, 1 + cardCopyNumbers.Count(copy => copy == cardNumber)));
}

Console.WriteLine($"Result #2: {result2}");
