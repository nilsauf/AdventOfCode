using AdventOfCode_2023.Day_3;

Console.WriteLine("Advent Of Code 2023 - Day 3");
Console.WriteLine();

int result1 = GetNumbersToAdd([.. Data.Input.Split('\n')])
	.Sum();

IEnumerable<int> GetNumbersToAdd(List<string> scematicLines)
{
	foreach ((var line, int lineIndex) in scematicLines.Select((line, index) => (line, index)))
	{
		foreach (var numberMatch in Data.FirstNumber.Matches(line).ToList())
		{
			var matchGroup = numberMatch.Groups[1];
			bool notStartOfLine = matchGroup.Index > 0;
			bool notEndIfLine = matchGroup.Index + matchGroup.Length < (line.Length - 1);

			bool relevant =
				(notStartOfLine && line[matchGroup.Index - 1] != '.') ||
				(notEndIfLine && line[numberMatch.Index + matchGroup.Length] != '.') ||
				(lineIndex > 0 && Enumerable.Range(0, matchGroup.Length + (notStartOfLine ? 1 : 0) + (notEndIfLine ? 1 : 0))
					.Select(numberIndex => scematicLines[lineIndex - 1][matchGroup.Index + numberIndex - (notStartOfLine ? 1 : 0)])
					.Any(prevLineChar => prevLineChar != '.')) ||
				(lineIndex + 1 < (scematicLines.Count - 1) && Enumerable.Range(0, matchGroup.Length + +(notStartOfLine ? 1 : 0) + (notEndIfLine ? 1 : 0))
					.Select(numberIndex => scematicLines[lineIndex + 1][matchGroup.Index + numberIndex - (notStartOfLine ? 1 : 0)])
					.Any(prevLineChar => prevLineChar != '.'));

			if (relevant == false)
				continue;

			int number = int.Parse(numberMatch.Groups[1].Value);
			yield return number;
		}

	}
}

Console.WriteLine($"Result #1: {result1}");


/// ---------------------------------------------------------------------- ///

int result2 = GetGearRatios([.. Data.Input.Split('\n')])
	.Sum();

IEnumerable<int> GetGearRatios(List<string> scematicLines)
{
	foreach ((var line, int lineIndex) in scematicLines.Select((line, index) => (line, index)))
	{
		int startIndex = 0;
		int foundIndex = line.IndexOf('*', startIndex);
		while (foundIndex != -1)
		{
			var numbers = GetTwoAdjacentNumbers(foundIndex);

			if (numbers.HasValue)
			{
				yield return numbers.Value.first * numbers.Value.second;
			}

			startIndex = foundIndex + 1;
			foundIndex = startIndex < (line.Length - 1) ?
				line.IndexOf('*', startIndex) :
				-1;
		}

		(int first, int second)? GetTwoAdjacentNumbers(int asterixIndex)
		{
			List<int> numbers = [];

			string prev = line[..(asterixIndex + 1)];
			var prevAsterix = Data.NumberPrevAsterix.Match(prev);
			if (prevAsterix.Success)
			{
				numbers.Add(int.Parse(prevAsterix.Groups[1].Value));
			}

			var postAsterix = Data.NumberPostAsterix.Match(line[asterixIndex..]);
			if (postAsterix.Success)
			{
				numbers.Add(int.Parse(postAsterix.Groups[1].Value));
			}

			if (lineIndex > 0)
			{
				numbers.AddRange(Data.NumbersOfLine.Matches(scematicLines[lineIndex - 1])
					.Where(match => match.Success)
					.Where(match => Enumerable.Range(match.Index, match.Length)
						.Any(i => i == asterixIndex - 1 || i == asterixIndex || i == asterixIndex + 1))
					.Select(match => int.Parse(match.Value)));
			}

			if (lineIndex < (scematicLines.Count - 1))
			{
				numbers.AddRange(Data.NumbersOfLine.Matches(scematicLines[lineIndex + 1])
					.Where(match => match.Success)
					.Where(match => Enumerable.Range(match.Index, match.Length)
						.Any(i => i == asterixIndex - 1 || i == asterixIndex || i == asterixIndex + 1))
					.Select(match => int.Parse(match.Value)));
			}

			return numbers.Count != 2 ?
				null :
				(numbers.First(), numbers.Last());
		}
	}
}

Console.WriteLine($"Result #2: {result2}");