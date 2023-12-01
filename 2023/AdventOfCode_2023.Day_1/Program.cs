using AdventOfCode_2023.Day_1;

Console.WriteLine("Advent Of Code 2023 - Day 1");
Console.WriteLine();

int result1 = Data.Input.Split('\n')
	.Select(GetAllNumbers)
	.Where(numbers => numbers.Any())
	.Select(numbers => (numbers.First() * 10) + numbers.Last())
	.Sum();

List<int> GetAllNumbers(string line)
	=> line.ToCharArray()
		.Select<char, int?>(c => int.TryParse(c.ToString(), out int result) ? result : null)
		.Where(number => number is not null)
		.Cast<int>()
		.ToList();

Console.WriteLine($"Result #1: {result1}");

/// ---------------------------------------------------------------------- ///

int result2 = Data.Input.Split('\n')
	.Select(GetAllWrittenNumbers)
	.Where(numbers => numbers.Any())
	.Select(numbers => (numbers.First() * 10) + numbers.Last())
	.Sum();

Console.WriteLine($"Result #2: {result2}");

List<int> GetAllWrittenNumbers(string line)
	=> Data.NumberMap.Keys
		.SelectMany(key => Enumerable.Range(0, line.Length)
			.Select(startIndex => (key, index: line.IndexOf(key, startIndex)))
			.TakeWhile(data => data.index != -1)
			.Select(data => (number: Data.NumberMap[data.key], data.index)))
		.Concat(line.ToCharArray()
			.Select((c, index) => int.TryParse(c.ToString(), out int number) ? (number, index) : (number: -1, index: -1)))
		.Where(data => data.index != -1)
		.OrderBy(data => data.index)
		.Select(data => data.number)
		.ToList();
