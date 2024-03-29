﻿using AdventOfCode_2023.Day_2;

Console.WriteLine("Advent Of Code 2023 - Day 2");
Console.WriteLine();

int result1 = Data.Input.Split('\n')
	.Select(GetIDIfPossible)
	.Sum();

int GetIDIfPossible(string line)
{
	int gameId = int.Parse(Data.GameIDRegex.Match(line).Groups[1].Value);

	var gameImpossible = line.Split(':')
		.Last()
		.Split(';')
		.Select(dataPart => dataPart
			.Split(',')
			.Select(draw => Data.GameDataRegex.Match(draw))
			.Select(drawMatch => (
				count: int.Parse(drawMatch.Groups[1].Value),
				color: drawMatch.Groups[2].Value.Trim(' ', '\r', '\n')
			))
			.Aggregate(
				new Dictionary<string, int>() { { "red", 0 }, { "blue", 0 }, { "green", 0 } },
				(aggregate, newData) =>
				{
					aggregate[newData.color] += newData.count;
					return aggregate;
				}))
		.Any(colorCountDict =>
			colorCountDict["red"] > Data.MaxRed ||
			colorCountDict["blue"] > Data.MaxBlue ||
			colorCountDict["green"] > Data.MaxGreen);

	return gameImpossible ? 0 : gameId;
}

Console.WriteLine($"Result #1: {result1}");

/// ---------------------------------------------------------------------- ///

int result2 = Data.Input.Split('\n')
	.Select(GetPowerOfMinimumSet)
	.Sum();

int GetPowerOfMinimumSet(string line)
{
	return line.Split(':')
		.Last()
		.Split(';')
		.Select(dataPart => dataPart
			.Split(',')
			.Select(draw => Data.GameDataRegex.Match(draw))
			.Select(drawMatch => (
				count: int.Parse(drawMatch.Groups[1].Value),
				color: drawMatch.Groups[2].Value.Trim(' ', '\r', '\n')
			))
			.Aggregate(
				new Dictionary<string, int>() { { "red", 0 }, { "blue", 0 }, { "green", 0 } },
				(aggregate, newData) =>
				{
					aggregate[newData.color] += newData.count;
					return aggregate;
				}))
		.Aggregate(
			new Dictionary<string, int>() { { "red", 0 }, { "blue", 0 }, { "green", 0 } },
			(aggregate, newData) =>
			{
				if (aggregate["red"] < newData["red"])
					aggregate["red"] = newData["red"];
				if (aggregate["blue"] < newData["blue"])
					aggregate["blue"] = newData["blue"];
				if (aggregate["green"] < newData["green"])
					aggregate["green"] = newData["green"];
				return aggregate;
			})
		.Values
		.Aggregate(1, (aggregate, nextValue) => aggregate * nextValue);
}

Console.WriteLine($"Result #2: {result2}");